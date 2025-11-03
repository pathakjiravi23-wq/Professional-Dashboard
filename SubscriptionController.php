<?php

// app/Http/Controllers/SubscriptionController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // We type-hint 'User $user' to get the user being subscribed to
    public function toggle(User $user, Request $request)
    {
        $subscriber = auth()->user();

        // This is the key: check if the 'subscribe' button
        // was on a post page and passed the post's ID.
        $sourcePostId = $request->input('source_post_id', null);

        // Check if the user is already subscribed
        $isSubscribed = $subscriber->subscriptions()->where('subscribed_to_user_id', $user->id)->exists();

        if ($isSubscribed) {
            // Unsubscribe
            $subscriber->subscriptions()->detach($user->id);
        } else {
            // Subscribe, and pass the source_post_id
            $subscriber->subscriptions()->attach($user->id, [
                'source_post_id' => $sourcePostId
            ]);
        }

        return back();
    }
}