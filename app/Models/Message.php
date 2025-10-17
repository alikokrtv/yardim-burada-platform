<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'help_request_id',
        'group_id',
        'content',
        'type',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }

    // Relationships
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function helpRequest()
    {
        return $this->belongsTo(HelpRequest::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    // Scopes
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    public function scopeForHelpRequest($query, $helpRequestId)
    {
        return $query->where('help_request_id', $helpRequestId);
    }

    public function scopeForGroup($query, $groupId)
    {
        return $query->where('group_id', $groupId);
    }

    // Helper methods
    public function markAsRead()
    {
        $this->update(['is_read' => true]);
    }
}
