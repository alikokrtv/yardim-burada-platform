<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'city',
        'category',
        'owner_id',
        'cover_image',
        'rules',
        'is_public',
        'member_count',
    ];

    protected function casts(): array
    {
        return [
            'rules' => 'array',
            'is_public' => 'boolean',
        ];
    }

    // Relationships
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'group_members')
                    ->withPivot('role', 'joined_at')
                    ->withTimestamps();
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // Scopes
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', $city);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Helper methods
    public function addMember($userId, $role = 'member')
    {
        $this->members()->attach($userId, [
            'role' => $role,
            'joined_at' => now(),
        ]);
        
        $this->increment('member_count');
    }

    public function removeMember($userId)
    {
        $this->members()->detach($userId);
        $this->decrement('member_count');
    }

    public function isMember($userId)
    {
        return $this->members()->where('user_id', $userId)->exists();
    }

    public function isOwner($userId)
    {
        return $this->owner_id === $userId;
    }
}
