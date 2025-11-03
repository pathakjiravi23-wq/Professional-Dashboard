<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_photo_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $appends = ['profile_photo_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    protected function profilePhotoUrl(): Attribute // <-- ADD THIS FUNCTION
    {
        return Attribute::make(
            get: fn() => $this->profile_photo_path
            // Use Storage::url to get the full path
            ? Storage::url($this->profile_photo_path)
            // A fallback image. You can use a default SVG or Gravatar
            : 'https://ui-avatars.com/api/?name=' . urlencode($this->name)
        );
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // A user can write many comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Posts that the user has liked
    public function likes()
    {
        return $this->belongsToMany(Post::class, 'likes');
    }

    // Posts that the user has upvoted
    public function upvotes()
    {
        return $this->belongsToMany(Post::class, 'upvotes');
    }

    // Users that this user is subscribed to
    public function subscriptions()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'subscriber_id', 'subscribed_to_user_id');
    }

    // Users who are subscribed to this user
    public function subscribers()
    {
        return $this->belongsToMany(User::class, 'subscriptions', 'subscribed_to_user_id', 'subscriber_id');
    }
}
