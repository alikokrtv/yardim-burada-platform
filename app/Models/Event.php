<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'user_id',
        'title',
        'description',
        'start_date',
        'end_date',
        'latitude',
        'longitude',
        'address',
        'max_participants',
        'participant_count',
        'status',
        'images',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'images' => 'array',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
        ];
    }

    // Relationships
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function participants()
    {
        return $this->hasMany(EventParticipant::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                    ->where('start_date', '>', now());
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_date', '>', now())
                    ->where('status', 'active');
    }

    // Helper methods
    public function isFull()
    {
        return $this->max_participants && 
               $this->participant_count >= $this->max_participants;
    }

    public function addParticipant()
    {
        if (!$this->isFull()) {
            $this->increment('participant_count');
            return true;
        }
        return false;
    }

    public function removeParticipant()
    {
        if ($this->participant_count > 0) {
            $this->decrement('participant_count');
        }
    }
}
