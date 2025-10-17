<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserStat;
use App\Models\Medal;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Display the user profile.
     */
    public function show(): JsonResponse
    {
        $user = Auth::user()->load(['stats', 'medals']);
        
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the user profile.
     */
    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100',
            'bio' => 'nullable|string|max:500',
            'interests' => 'nullable|array',
            'interests.*' => 'string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $user->update($request->only([
            'name', 'phone', 'city', 'district', 'bio', 'interests'
        ]));

        return response()->json([
            'success' => true,
            'data' => $user->load(['stats', 'medals']),
            'message' => 'Profil başarıyla güncellendi.'
        ]);
    }

    /**
     * Update user location.
     */
    public function updateLocation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'city' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $user->update([
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'city' => $request->city ?? $user->city,
            'district' => $request->district ?? $user->district,
            'last_active_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Konum başarıyla güncellendi.'
        ]);
    }

    /**
     * Get user statistics.
     */
    public function getStats(): JsonResponse
    {
        $user = Auth::user();
        $stats = $user->stats ?? UserStat::create(['user_id' => $user->id]);

        return response()->json([
            'success' => true,
            'data' => [
                'helps_given' => $stats->helps_given,
                'helps_received' => $stats->helps_received,
                'events_attended' => $stats->events_attended,
                'groups_joined' => $stats->groups_joined,
                'total_xp' => $stats->total_xp,
                'current_level' => $stats->current_level,
                'rating_average' => $stats->rating_average,
                'rating_count' => $stats->rating_count
            ]
        ]);
    }

    /**
     * Get user medals.
     */
    public function getMedals(): JsonResponse
    {
        $user = Auth::user();
        $medals = $user->medals()->withPivot('earned_at')->get();

        return response()->json([
            'success' => true,
            'data' => $medals
        ]);
    }

    /**
     * Get available medals that user can earn.
     */
    public function getAvailableMedals(): JsonResponse
    {
        $user = Auth::user();
        $earnedMedalIds = $user->medals()->pluck('medal_id')->toArray();
        
        $availableMedals = Medal::active()
            ->whereNotIn('id', $earnedMedalIds)
            ->where('requirement_points', '<=', $user->xp)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $availableMedals
        ]);
    }

    /**
     * Earn a medal.
     */
    public function earnMedal(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'medal_id' => 'required|exists:medals,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $medal = Medal::findOrFail($request->medal_id);

        if (!$medal->canBeEarnedBy($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Bu madalyonu kazanmak için yeterli XP\'niz yok veya zaten kazandınız.'
            ], 400);
        }

        $user->medals()->attach($medal->id, ['earned_at' => now()]);

        return response()->json([
            'success' => true,
            'message' => 'Tebrikler! ' . $medal->name . ' madalyonunu kazandınız!',
            'data' => $medal
        ]);
    }
}
