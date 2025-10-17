<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HelpRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HelpRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = HelpRequest::with(['user'])
            ->active()
            ->orderBy('created_at', 'desc');

        // Konum bazlı filtreleme
        if ($request->has('latitude') && $request->has('longitude')) {
            $query->nearby($request->latitude, $request->longitude, $request->get('radius', 10));
        }

        // Kategori filtresi
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Şehir filtresi
        if ($request->has('city')) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('city', $request->city);
            });
        }

        $helpRequests = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $helpRequests
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'category' => 'required|string|max:100',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'nullable|string|max:500',
            'expires_at' => 'required|date|after:now',
            'priority' => 'integer|in:1,2,3',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $helpRequest = HelpRequest::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address,
            'expires_at' => $request->expires_at,
            'priority' => $request->get('priority', 1),
            'images' => $request->images ?? []
        ]);

        // XP ekleme
        Auth::user()->addXP(5); // Yardım isteği oluşturma için 5 XP

        return response()->json([
            'success' => true,
            'data' => $helpRequest->load('user'),
            'message' => 'Yardım isteği başarıyla oluşturuldu.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $helpRequest = HelpRequest::with(['user', 'messages.sender'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $helpRequest
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($id);

        // Sadece istek sahibi güncelleyebilir
        if ($helpRequest->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'category' => 'sometimes|required|string|max:100',
            'latitude' => 'sometimes|required|numeric|between:-90,90',
            'longitude' => 'sometimes|required|numeric|between:-180,180',
            'address' => 'nullable|string|max:500',
            'expires_at' => 'sometimes|required|date|after:now',
            'priority' => 'integer|in:1,2,3',
            'status' => 'sometimes|in:active,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $helpRequest->update($request->only([
            'title', 'description', 'category', 'latitude', 'longitude',
            'address', 'expires_at', 'priority', 'status'
        ]));

        return response()->json([
            'success' => true,
            'data' => $helpRequest->load('user'),
            'message' => 'Yardım isteği başarıyla güncellendi.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($id);

        // Sadece istek sahibi silebilir
        if ($helpRequest->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $helpRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Yardım isteği başarıyla silindi.'
        ]);
    }

    /**
     * Mark help request as completed
     */
    public function complete(string $id): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($id);

        if ($helpRequest->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $helpRequest->markAsCompleted();

        return response()->json([
            'success' => true,
            'message' => 'Yardım isteği tamamlandı olarak işaretlendi.'
        ]);
    }

    /**
     * Get nearby help requests
     */
    public function nearby(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-180,180',
            'radius' => 'numeric|min:1|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $helpRequests = HelpRequest::with(['user'])
            ->active()
            ->nearby($request->lat, $request->lng, $request->get('radius', 10))
            ->limit(50)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $helpRequests
        ]);
    }

    /**
     * Help with a request
     */
    public function help(string $id): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($id);

        // Kendi isteğine yardım edemez
        if ($helpRequest->user_id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Kendi isteğinize yardım edemezsiniz.'
            ], 400);
        }

        // Zaten tamamlanmış istek
        if ($helpRequest->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Bu istek artık aktif değil.'
            ], 400);
        }

        // Yardım mesajı oluştur
        $message = \App\Models\Message::create([
            'sender_id' => Auth::id(),
            'help_request_id' => $helpRequest->id,
            'content' => 'Bu konuda yardım edebilirim!',
            'type' => 'help_request'
        ]);

        // XP ekleme
        Auth::user()->addXP(3); // Yardım teklifi için 3 XP

        return response()->json([
            'success' => true,
            'message' => 'Yardım teklifiniz gönderildi!',
            'data' => $message
        ]);
    }
}
