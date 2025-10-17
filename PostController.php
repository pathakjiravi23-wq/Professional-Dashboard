<?php

namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia; // 👈 Make sure to import Inertia
use Illuminate\Support\Facades\Storage;
class PostController extends Controller
{
    /**
     * Display a listing of the posts.
     */
    public function index()
    {
        // Later, you'll fetch posts from the database here
        return Inertia::render('Admin/Posts/Index');
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

        Post::create($validated);

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
        // Eager load the user (author) relationship for the single post
        $post->load('user');

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }
}
