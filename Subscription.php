<?php

// app/Models/Subscription.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    // 3. Make sure there are NO "use" statements inside here

    protected $table = 'subscriptions';
    protected $fillable = ['subscriber_id', 'subscribed_to_user_id', 'source_post_id'];

    public function sourcePost()
    {
        return $this->belongsTo(Post::class, 'source_post_id');
    }
}