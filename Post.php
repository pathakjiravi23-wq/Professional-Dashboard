<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory;
    protected $appends = ['ups', 'featured_image_url'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'featured_image',
        'category',
        'user_id',
    ];
    // The author of the post
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // All comments on the post
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // All users who liked the post
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes');
    }

    // All users who upvoted the post
    public function upvotes()
    {
        return $this->belongsToMany(User::class, 'upvotes');
    }

    // All new subscriptions that came from this post
    public function subscribersGained()
    {
        // We relate to the Subscription model directly here
        return $this->hasMany(Subscription::class, 'source_post_id');
    }
    /**
     * Accessor for the 'Ups!' engagement score.
     * This is a CALCULATED property. It doesn't exist in the database.
     * It will be available as $post->ups
     */
    protected function ups(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->views == 0) {
                    return 0; // Avoid division by zero
                }

                // --- THIS IS YOUR CUSTOM FORMULA ---
                // ...
                $engagementRate = ($this->likes_count + $this->comments_count) / $this->views;

                // We'll return a percentage, capped at 100.
                return round(min($engagementRate * 100, 100));
            }
        );
    }

    /**
     * Accessor for the full image URL.
     * Your 'Manage Posts' tab uses '/storage/...' but 'Post Insights' needs a full URL.
     * This provides a consistent, full URL.
     */
    protected function featuredImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->featured_image
            // This correctly gets the full URL for an image in public storage
            ? Storage::url($this->featured_image)
            // A fallback image if none is set
            : 'https://picsum.photos/seed/default/400/300'
        );
    }
}

