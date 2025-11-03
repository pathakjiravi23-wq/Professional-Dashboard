<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        $user = auth()->user();

        // 1. Get all posts for the authenticated user
        // We use withCount() for amazing performance.
        // This executes ONE query to get all posts, and separate queries
        // to get the *counts* of each relationship.
        $posts = Post::where('user_id', $user->id)
            ->withCount(['likes', 'comments', 'subscribersGained'])
            // If you added the 'upvotes' table, add it here:
            // ->withCount(['likes', 'comments', 'subscribersGained', 'upvotes'])
            ->orderBy('created_at', 'desc')
            ->get();

        // 2. Calculate total stats from the posts collection
        $totalViews = $posts->sum('views');
        $totalLikes = $posts->sum('likes_count'); // 'likes_count' is added by withCount()
        $totalComments = $posts->sum('comments_count'); // 'comments_count'

        // 3. Get total subscribers for the user
        $totalSubscribers = $user->subscribers()->count();

        // 4. Calculate average 'ups' score (using our 'ups' accessor)
        $averageUps = $posts->avg('ups'); // $post->ups is the accessor we built

        // 5. Render the Inertia component with the new prop
        return Inertia::render('Dashboard', [
            // Your existing props
            'mustVerifyEmail' => $user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail(),
            'status' => session('status'),

            // This prop is already used by your 'Manage Posts' tab
            'posts' => $posts,

            // --- THIS IS THE NEW PROP FOR 'POST INSIGHTS' ---
            'postAnalytics' => [
                'posts' => $posts->map(fn($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'imageUrl' => $post->featured_image_url, // From our accessor
                    'views' => $post->views,
                    'likes' => $post->likes_count,
                    'comments' => $post->comments_count,
                    'ups' => $post->ups, // From our accessor
                    'subscribersGained' => $post->subscribers_gained_count,
                ]),
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalComments' => $totalComments,
                'totalSubscribers' => $totalSubscribers,
                'averageUps' => round($averageUps, 1),
            ]
        ]);
        // Later, you'll fetch posts from the database here
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }
    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'featured_image' => 'required|image|max:2048', // Max 2MB
            'category' => 'required|string|max:255',
        ]);

        $path = $request->file('featured_image')->store('posts', 'public');
        $validated['featured_image'] = $path;

        // --- THIS IS THE FIX ---
        // Replace this:
        // Post::create($validated);

        // With this:
        // This uses the authenticated user's relationship to create the post,
        // which automatically fills in the `user_id`.
        $request->user()->posts()->create($validated);
        // --- END OF FIX ---

        // Redirect to the manage posts page after creation
        return to_route('admin.posts.index')->with('success', 'Post created successfully!');
    }
    /**
     * Display post insights/analytics.
     */
    public function insights()
    {
        return Inertia::render('Admin/Posts/Insights');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string|max:255',
            'featured_image' => 'nullable|image|max:2048',
        ]);

        // Check if a new image was uploaded
        if ($request->hasFile('featured_image')) {
            // Delete the old image
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            // Store the new image and update the path
            $path = $request->file('featured_image')->store('posts', 'public');
            $validated['featured_image'] = $path;
        }

        $post->update($validated);

        return to_route('dashboard')->with('success', 'Post updated successfully!');
    }


    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        // Delete the featured image from storage
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        $post->delete();

        return back()->with('success', 'Post deleted successfully!');
    }
    public function show(Post $post)
    {
        // Increment the view count *before* you return the view
        $post->increment('views');

        // Eager load the user (author) relationship
        $post->load('user');

        // Return the view one time
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }


}
