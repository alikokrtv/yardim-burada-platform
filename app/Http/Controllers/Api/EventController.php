<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Event::with(['creator', 'group'])
            ->where('status', 'active')
            ->orderBy('start_date', 'asc');

        // Grup filtresi
        if ($request->has('group_id')) {
            $query->where('group_id', $request->group_id);
        }

        // Şehir filtresi
        if ($request->has('city')) {
            $query->whereHas('creator', function($q) use ($request) {
                $q->where('city', $request->city);
            });
        }

        // Tarih filtresi
        if ($request->has('date_from')) {
            $query->where('start_date', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->where('start_date', '<=', $request->date_to);
        }

        $events = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $events
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'group_id' => 'nullable|exists:groups,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'start_date' => 'required|date|after:now',
            'end_date' => 'nullable|date|after:start_date',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'address' => 'nullable|string|max:500',
            'max_participants' => 'nullable|integer|min:1',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Grup kontrolü
        if ($request->has('group_id')) {
            $group = \App\Models\Group::findOrFail($request->group_id);
            
            // Grup üyesi mi kontrol et
            $isMember = \App\Models\GroupMember::where('group_id', $group->id)
                ->where('user_id', Auth::id())
                ->exists();

            if (!$isMember) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bu grup için etkinlik oluşturmak için grup üyesi olmalısınız.'
                ], 403);
            }
        }

        $event = Event::create([
            'group_id' => $request->group_id,
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address,
            'max_participants' => $request->max_participants,
            'images' => $request->images ?? [],
            'status' => 'active'
        ]);

        // XP ekleme
        Auth::user()->addXP(8); // Etkinlik oluşturma için 8 XP

        return response()->json([
            'success' => true,
            'data' => $event->load(['creator', 'group']),
            'message' => 'Etkinlik başarıyla oluşturuldu.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $event = Event::with(['creator', 'group', 'participants.user'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        // Sadece etkinlik oluşturan güncelleyebilir
        if ($event->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'start_date' => 'sometimes|required|date|after:now',
            'end_date' => 'nullable|date|after:start_date',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'address' => 'nullable|string|max:500',
            'max_participants' => 'nullable|integer|min:1',
            'status' => 'sometimes|in:draft,active,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $event->update($request->only([
            'title', 'description', 'start_date', 'end_date', 'latitude', 
            'longitude', 'address', 'max_participants', 'status'
        ]));

        return response()->json([
            'success' => true,
            'data' => $event->load(['creator', 'group']),
            'message' => 'Etkinlik başarıyla güncellendi.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        // Sadece etkinlik oluşturan silebilir
        if ($event->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Etkinlik başarıyla silindi.'
        ]);
    }

    /**
     * Attend an event
     */
    public function attend(string $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        // Zaten katılımcı mı kontrol et
        $existingParticipant = EventParticipant::where('event_id', $event->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingParticipant) {
            return response()->json([
                'success' => false,
                'message' => 'Zaten bu etkinliğe katılıyorsunuz.'
            ], 400);
        }

        // Etkinlik dolu mu kontrol et
        if ($event->isFull()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu etkinlik dolu.'
            ], 400);
        }

        // Etkinlik aktif mi kontrol et
        if ($event->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Bu etkinlik artık aktif değil.'
            ], 400);
        }

        EventParticipant::create([
            'event_id' => $event->id,
            'user_id' => Auth::id(),
            'joined_at' => now()
        ]);

        // Katılımcı sayısını güncelle
        $event->increment('participant_count');

        // XP ekleme
        Auth::user()->addXP(3); // Etkinlik katılımı için 3 XP

        return response()->json([
            'success' => true,
            'message' => 'Etkinliğe başarıyla katıldınız.'
        ]);
    }

    /**
     * Leave an event
     */
    public function leave(string $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        $participant = EventParticipant::where('event_id', $event->id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$participant) {
            return response()->json([
                'success' => false,
                'message' => 'Bu etkinliğe katılmıyorsunuz.'
            ], 400);
        }

        $participant->delete();

        // Katılımcı sayısını güncelle
        $event->decrement('participant_count');

        return response()->json([
            'success' => true,
            'message' => 'Etkinlikten başarıyla ayrıldınız.'
        ]);
    }
}