<?php
// app/Http/Controllers/LikeController.php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        // toggle() is a helper that attaches if not attached,
        // and detaches if already attached.
        // This handles both "liking" and "unliking" in one line.
        auth()->user()->likes()->toggle($post->id);

        return back();
    }
}