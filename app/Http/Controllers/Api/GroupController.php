<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Group::with(['owner', 'members'])
            ->where('is_public', true)
            ->orderBy('created_at', 'desc');

        // Şehir filtresi
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        // Kategori filtresi
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $groups = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $groups
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'city' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'rules' => 'nullable|array',
            'is_public' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $group = Group::create([
            'name' => $request->name,
            'description' => $request->description,
            'city' => $request->city,
            'category' => $request->category,
            'owner_id' => Auth::id(),
            'cover_image' => $request->cover_image,
            'rules' => $request->rules ?? [],
            'is_public' => $request->get('is_public', true)
        ]);

        // Grup sahibini otomatik olarak üye yap
        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => Auth::id(),
            'role' => 'admin',
            'joined_at' => now()
        ]);

        // XP ekleme
        Auth::user()->addXP(10); // Grup oluşturma için 10 XP

        return response()->json([
            'success' => true,
            'data' => $group->load(['owner', 'members']),
            'message' => 'Grup başarıyla oluşturuldu.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $group = Group::with(['owner', 'members.user', 'events'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $group
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $group = Group::findOrFail($id);

        // Sadece grup sahibi güncelleyebilir
        if ($group->owner_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:1000',
            'city' => 'sometimes|required|string|max:100',
            'category' => 'sometimes|required|string|max:100',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'rules' => 'nullable|array',
            'is_public' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $group->update($request->only([
            'name', 'description', 'city', 'category', 'cover_image', 'rules', 'is_public'
        ]));

        return response()->json([
            'success' => true,
            'data' => $group->load(['owner', 'members']),
            'message' => 'Grup başarıyla güncellendi.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $group = Group::findOrFail($id);

        // Sadece grup sahibi silebilir
        if ($group->owner_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $group->delete();

        return response()->json([
            'success' => true,
            'message' => 'Grup başarıyla silindi.'
        ]);
    }

    /**
     * Join a group
     */
    public function join(string $id): JsonResponse
    {
        $group = Group::findOrFail($id);

        // Zaten üye mi kontrol et
        $existingMember = GroupMember::where('group_id', $group->id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingMember) {
            return response()->json([
                'success' => false,
                'message' => 'Zaten bu grubun üyesisiniz.'
            ], 400);
        }

        // Grup kapalıysa sadece davet ile katılabilir
        if (!$group->is_public) {
            return response()->json([
                'success' => false,
                'message' => 'Bu grup kapalı. Katılmak için davet gereklidir.'
            ], 400);
        }

        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => Auth::id(),
            'role' => 'member',
            'joined_at' => now()
        ]);

        // Üye sayısını güncelle
        $group->increment('member_count');

        // XP ekleme
        Auth::user()->addXP(5); // Grup katılımı için 5 XP

        return response()->json([
            'success' => true,
            'message' => 'Gruba başarıyla katıldınız.'
        ]);
    }

    /**
     * Leave a group
     */
    public function leave(string $id): JsonResponse
    {
        $group = Group::findOrFail($id);

        $member = GroupMember::where('group_id', $group->id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Bu grubun üyesi değilsiniz.'
            ], 400);
        }

        // Grup sahibi gruptan ayrılamaz
        if ($group->owner_id === Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Grup sahibi gruptan ayrılamaz.'
            ], 400);
        }

        $member->delete();

        // Üye sayısını güncelle
        $group->decrement('member_count');

        return response()->json([
            'success' => true,
            'message' => 'Gruptan başarıyla ayrıldınız.'
        ]);
    }
}