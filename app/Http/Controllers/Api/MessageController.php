<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\HelpRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Message::with(['sender', 'receiver', 'helpRequest', 'group'])
            ->where(function($q) {
                $q->where('sender_id', Auth::id())
                  ->orWhere('receiver_id', Auth::id());
            })
            ->orderBy('created_at', 'desc');

        $messages = $query->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'nullable|exists:users,id',
            'help_request_id' => 'nullable|exists:help_requests,id',
            'group_id' => 'nullable|exists:groups,id',
            'content' => 'required|string|max:1000',
            'type' => 'required|in:help_request,group_chat,private'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $message = Message::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'help_request_id' => $request->help_request_id,
            'group_id' => $request->group_id,
            'content' => $request->content,
            'type' => $request->type
        ]);

        return response()->json([
            'success' => true,
            'data' => $message->load(['sender', 'receiver']),
            'message' => 'Mesaj başarıyla gönderildi.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $message = Message::with(['sender', 'receiver', 'helpRequest', 'group'])
            ->findOrFail($id);

        // Mesajı okundu olarak işaretle
        if ($message->receiver_id === Auth::id() && !$message->is_read) {
            $message->markAsRead();
        }

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $message = Message::findOrFail($id);

        // Sadece gönderen güncelleyebilir
        if ($message->sender_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'required|string|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $message->update(['content' => $request->content]);

        return response()->json([
            'success' => true,
            'data' => $message->load(['sender', 'receiver']),
            'message' => 'Mesaj başarıyla güncellendi.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $message = Message::findOrFail($id);

        // Sadece gönderen silebilir
        if ($message->sender_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bu işlem için yetkiniz yok.'
            ], 403);
        }

        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Mesaj başarıyla silindi.'
        ]);
    }

    /**
     * Get messages for a help request
     */
    public function getHelpRequestMessages(string $helpRequestId): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($helpRequestId);

        // Sadece istek sahibi veya yardım edenler görebilir
        if ($helpRequest->user_id !== Auth::id()) {
            $hasHelped = Message::where('help_request_id', $helpRequestId)
                ->where('sender_id', Auth::id())
                ->exists();
            
            if (!$hasHelped) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bu işlem için yetkiniz yok.'
                ], 403);
            }
        }

        $messages = Message::with(['sender'])
            ->where('help_request_id', $helpRequestId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    /**
     * Get messages for a group
     */
    public function getGroupMessages(string $groupId): JsonResponse
    {
        // Grup üyesi kontrolü
        $isMember = \App\Models\GroupMember::where('group_id', $groupId)
            ->where('user_id', Auth::id())
            ->exists();

        if (!$isMember) {
            return response()->json([
                'success' => false,
                'message' => 'Bu grup için yetkiniz yok.'
            ], 403);
        }

        $messages = Message::with(['sender'])
            ->where('group_id', $groupId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }
}