<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'helps_given',
        'helps_received',
        'events_attended',
        'groups_joined',
        'total_xp',
        'current_level',
        'rating_average',
        'rating_count',
    ];

    protected function casts(): array
    {
        return [
            'rating_average' => 'decimal:2',
        ];
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function incrementHelpsGiven()
    {
        $this->increment('helps_given');
        $this->addXP(10); // Her yardım için 10 XP
    }

    public function incrementHelpsReceived()
    {
        $this->increment('helps_received');
    }

    public function incrementEventsAttended()
    {
        $this->increment('events_attended');
        $this->addXP(5); // Her etkinlik katılımı için 5 XP
    }

    public function incrementGroupsJoined()
    {
        $this->increment('groups_joined');
        $this->addXP(3); // Her grup katılımı için 3 XP
    }

    public function addXP($points)
    {
        $this->increment('total_xp', $points);
        $this->updateLevel();
    }

    public function updateLevel()
    {
        $newLevel = floor($this->total_xp / 100) + 1;
        if ($newLevel > $this->current_level) {
            $this->update(['current_level' => $newLevel]);
        }
    }

    public function addRating($rating)
    {
        $totalRating = $this->rating_average * $this->rating_count + $rating;
        $this->increment('rating_count');
        $this->update(['rating_average' => $totalRating / $this->rating_count]);
    }
}
