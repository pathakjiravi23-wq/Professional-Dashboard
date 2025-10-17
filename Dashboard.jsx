import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm, router } from '@inertiajs/react';


// --- Partials and Form Components ---
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.jsx';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.jsx';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.jsx';

// --- SVG Icons ---
const LayoutDashboard = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>);
const FilePlus = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M12 9v6"></path><path d="M9 12h6"></path></svg>);
const FileText = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>);
const LineChart = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>);
const UserCircle = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 20a6 6 0 0 0-12 0"></path><circle cx="12" cy="10" r="4"></circle><circle cx="12" cy="12" r="10"></circle></svg>);
const LogOut = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>);
const Home = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const Search = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const Edit = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const Trash2 = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
const Eye = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const ThumbsUp = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a2 2 0 0 1 3 1.88Z"></path></svg>);
const MessageSquare = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const Users = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);

// --- Content Components for each tab ---

const CircularProgress = ({ score }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = 'stroke-green-500';
    if (score < 80) strokeColor = 'stroke-yellow-500';
    if (score < 70) strokeColor = 'stroke-red-500';

    return (
        <div className="relative flex items-center justify-center h-20 w-20">
            <svg className="absolute" width="80" height="80" viewBox="0 0 80 80">
                <circle className="stroke-gray-200" strokeWidth="8" fill="transparent" r={radius} cx="40" cy="40" />
                <circle
                    className={`${strokeColor} transition-all duration-500`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                    transform="rotate(-90 40 40)"
                />
            </svg>
            <span className="text-lg font-bold text-gray-700">{score}%</span>
        </div>
    );
};

const PostInsightsContent = () => {
    const postsAnalytics = [
        { id: 1, title: 'Getting Started with React Hooks', imageUrl: 'https://picsum.photos/seed/react/400/300', views: 12500, likes: 2300, comments: 45, ups: 92, subscribersGained: 150 },
        { id: 2, title: 'A Guide to Modern CSS', imageUrl: 'https://picsum.photos/seed/css/400/300', views: 8800, likes: 1500, comments: 22, ups: 85, subscribersGained: 95 },
        { id: 3, title: 'Top 10 Travel Destinations for 2026', imageUrl: 'https://picsum.photos/seed/travel/400/300', views: 25600, likes: 5100, comments: 112, ups: 98, subscribersGained: 320 },
        { id: 4, title: 'The Future of Remote Work', imageUrl: 'https://picsum.photos/seed/work/400/300', views: 5400, likes: 750, comments: 18, ups: 76, subscribersGained: 40 },
        { id: 5, title: 'Exploring the Wonders of the Cosmos', imageUrl: 'https://picsum.photos/seed/cosmos/400/300', views: 18900, likes: 4300, comments: 88, ups: 95, subscribersGained: 280 },
        { id: 6, title: 'Healthy Lifestyle Habits', imageUrl: 'https://picsum.photos/seed/lifestyle/400/300', views: 3200, likes: 450, comments: 12, ups: 68, subscribersGained: 25 },
    ];

    const [sortBy, setSortBy] = useState('ups');

    const totalSubscribers = 2450;
    const totalViews = postsAnalytics.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = postsAnalytics.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = postsAnalytics.reduce((sum, post) => sum + post.comments, 0);

    const sortedPosts = [...postsAnalytics].sort((a, b) => b[sortBy] - a[sortBy]);

    const formatNumber = (num) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post Insights</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                <button onClick={() => setSortBy('views')} className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 transition-transform hover:scale-105">
                    <div className="bg-indigo-100 rounded-full p-3"><Eye className="h-6 w-6 text-indigo-600" /></div>
                    <div><p className="text-gray-500 text-sm text-left">Total Views</p><p className="text-2xl font-bold text-gray-800">{formatNumber(totalViews)}</p></div>
                </button>
                <button onClick={() => setSortBy('likes')} className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 transition-transform hover:scale-105">
                    <div className="bg-blue-100 rounded-full p-3"><ThumbsUp className="h-6 w-6 text-blue-600" /></div>
                    <div><p className="text-gray-500 text-sm text-left">Total Likes</p><p className="text-2xl font-bold text-gray-800">{formatNumber(totalLikes)}</p></div>
                </button>
                <button onClick={() => setSortBy('comments')} className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 transition-transform hover:scale-105">
                    <div className="bg-cyan-100 rounded-full p-3"><MessageSquare className="h-6 w-6 text-cyan-600" /></div>
                    <div><p className="text-gray-500 text-sm text-left">Comments</p><p className="text-2xl font-bold text-gray-800">{formatNumber(totalComments)}</p></div>
                </button>
                <button onClick={() => setSortBy('subscribersGained')} className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 transition-transform hover:scale-105">
                    <div className="bg-red-100 rounded-full p-3"><Users className="h-6 w-6 text-red-600" /></div>
                    <div><p className="text-gray-500 text-sm text-left">Subscribers</p><p className="text-2xl font-bold text-gray-800">{formatNumber(totalSubscribers)}</p></div>
                </button>
                <button onClick={() => setSortBy('ups')} className="bg-white shadow-lg rounded-xl p-5 flex items-center space-x-4 transition-transform hover:scale-105">
                    <div className="bg-emerald-100 rounded-full p-3"><LineChart className="h-6 w-6 text-emerald-600" /></div>
                    <div><p className="text-gray-500 text-sm text-left">Avg. UPs!</p><p className="text-2xl font-bold text-gray-800">{(postsAnalytics.reduce((s, p) => s + p.ups, 0) / postsAnalytics.length).toFixed(1)}%</p></div>
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribers Gained</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement (UPs!)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-16">
                                                <img className="h-10 w-16 object-cover rounded-md" src={post.imageUrl} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatNumber(post.views)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatNumber(post.likes)}</td>
                                    {/* ✅ Comments Column Restored */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{post.comments}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">+{post.subscribersGained}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-center">
                                            <CircularProgress score={post.ups} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const ManagePostsContent = ({ posts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filters the posts received from the backend based on the search term
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handles the delete action
    const handleDelete = (post) => {
        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
            // Sends a DELETE request to the server
            router.delete(route('admin.posts.destroy', post.id), {
                preserveScroll: true, // Prevents the page from scrolling to the top after deletion
            });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Posts</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search posts by title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img className="h-10 w-16 object-cover rounded-md" src={`/storage/${post.featured_image}`} alt={post.title} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{post.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-4">
                                            {/* Link to the dedicated edit page for the post */}
                                            <Link href={route('admin.posts.edit', post.id)} className="text-indigo-600 hover:text-indigo-900 transition-colors" title="Edit Post">
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            {/* Button to trigger the delete confirmation */}
                                            <button onClick={() => handleDelete(post)} className="text-red-600 hover:text-red-900 transition-colors" title="Delete Post">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPosts.length === 0 && (
                    <div className="text-center p-12">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};



const ProfileContent = ({ mustVerifyEmail, status }) => (<div> <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2> <div className="mx-auto max-w-7xl space-y-6"> <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" /> </div> <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> <UpdatePasswordForm className="max-w-xl" /> </div> <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8"> <DeleteUserForm className="max-w-xl" /> </div> </div> </div>);

// In resources/js/Pages/Dashboard.jsx

function AddPostContent() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category: '',
        featured_image: null,
    });

    // This part is correct and needs useState
    const [imagePreview, setImagePreview] = useState(null);

    function handleChange(e) {
        const { id, value, type, files } = e.target;
        const inputValue = type === 'file' ? files?.[0] : value;
        setData(id, inputValue);

        if (type === 'file' && files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(files[0]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.posts.store'), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Post</h2>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 👇 THESE ARE THE CORRECTED LINES 👇 */}
                        <div><label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label><input type="text" id="title" name="title" value={data.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required placeholder="Enter your post title" /></div>
                        <div><label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label><textarea id="content" name="content" rows="4" value={data.content} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required placeholder="Write your post content here..."></textarea></div>
                        <div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label><select id="category" name="category" value={data.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required><option value="" disabled>Select a category</option><option value="technology">Technology</option><option value="lifestyle">Lifestyle</option><option value="business">Business</option><option value="science">Science</option><option value="travel">Travel</option></select></div>

                        <div><label className="block text-sm font-medium text-gray-700">Featured Image</label><div className="mt-2 flex items-center space-x-6"><div className="shrink-0">{imagePreview ? (<img src={imagePreview} alt="Image preview" className="h-20 w-20 rounded-md object-cover" />) : (<div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>)}</div><label className="block"><span className="sr-only">Choose profile photo</span>
                            <input type="file" id="featured_image" name="featured_image" onChange={handleChange} className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100" accept="image/*" />
                        </label></div></div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                                disabled={processing}
                            >
                                {processing ? 'Uploading...' : 'Upload Post'}
                            </button>
                        </div>
                    </form>
                    {/* Note: You also have an `isSubmitted` state variable here that is no longer defined. You can remove it since the main component now handles the success flash message. */}
                </div>
            </div>
        </div>
    );
}

const DashboardContent = ({ user, setActiveTab }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
            <div className="bg-white shadow-sm rounded-lg p-6 mb-8"><p className="text-gray-600">Welcome back, {user.name || 'User'}!</p></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <button onClick={() => setActiveTab('Add Post')} className="group flex flex-col justify-between rounded-xl p-6 text-white bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"><div><FilePlus className="h-8 w-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" /><h3 className="text-xl font-bold">Add New Post</h3></div><p className="mt-2 text-sm opacity-80">Create and publish a new article.</p></button>
                <button onClick={() => setActiveTab('Manage Posts')} className="group flex flex-col justify-between rounded-xl p-6 text-white bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"><div><FileText className="h-8 w-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" /><h3 className="text-xl font-bold">Manage Posts</h3></div><p className="mt-2 text-sm opacity-80">Edit, delete, or view your posts.</p></button>
                <button onClick={() => setActiveTab('Post Insights')} className="group flex flex-col justify-between rounded-xl p-6 text-white bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"><div><LineChart className="h-8 w-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" /><h3 className="text-xl font-bold">Post Insights</h3></div><p className="mt-2 text-sm opacity-80">Analyze traffic and engagement.</p></button>
            </div>
        </div>
    );
};

export default function AdminDashboard({ mustVerifyEmail, status, posts }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => { document.title = `${activeTab} - Admin Panel`; }, [activeTab]);
    const renderContent = () => {
        switch (activeTab) {
            case 'Add Post': return <AddPostContent />;
            case 'Manage Posts': return <ManagePostsContent posts={posts} />;
            case 'Post Insights': return <PostInsightsContent />;
            case 'Profile': return <ProfileContent mustVerifyEmail={mustVerifyEmail} status={status} />;
            case 'Dashboard': default: return <DashboardContent user={user} setActiveTab={setActiveTab} />;
        }
    };
    const SidebarItem = ({ icon, text, active, onClick }) => (<button onClick={() => { onClick(); setSidebarOpen(false); }} className={`flex w-full items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{icon}<span className="ml-3">{text}</span></button>);
    const sidebarContent = (<nav className="space-y-2"><SidebarItem text="Dashboard" icon={<LayoutDashboard className="h-5 w-5" />} active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} /><SidebarItem text="Add Post" icon={<FilePlus className="h-5 w-5" />} active={activeTab === 'Add Post'} onClick={() => setActiveTab('Add Post')} /><SidebarItem text="Manage Posts" icon={<FileText className="h-5 w-5" />} active={activeTab === 'Manage Posts'} onClick={() => setActiveTab('Manage Posts')} /><SidebarItem text="Post Insights" icon={<LineChart className="h-5 w-5" />} active={activeTab === 'Post Insights'} onClick={() => setActiveTab('Post Insights')} /><SidebarItem text="Profile" icon={<UserCircle className="h-5 w-5" />} active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} /></nav>);
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
            <aside className="hidden w-64 flex-shrink-0 flex-col bg-white p-4 shadow-lg lg:flex"><div className="mb-8 flex h-16 items-center justify-center shrink-0"> <svg className="h-8 w-auto text-indigo-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.33,21.89a2.3,2.3,0,0,1-2.25-1.5,2.15,2.15,0,0,1,.48-2.34L17.7,3.91a2.3,2.3,0,0,1,2.25,1.5,2.15,2.15,0,0,1-.48,2.34Z"></path><path d="M18.67,21.89a2.3,2.3,0,0,1-2.25-1.5,2.15,2.15,0,0,1,.48-2.34L3.76,2.11A2.3,2.3,0,0,1,6.01.61a2.15,2.15,0,0,1-.48,2.34Z"></path></svg> <span className="ml-3 text-xl font-bold">Admin Panel</span> </div>{sidebarContent}</aside>
            <div className={`fixed inset-0 z-40 flex transition-transform duration-300 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}><aside className="w-64 flex-shrink-0 flex-col bg-white p-4 shadow-lg"><div className="mb-8 flex h-16 items-center justify-center shrink-0"> <svg className="h-8 w-auto text-indigo-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.33,21.89a2.3,2.3,0,0,1-2.25-1.5,2.15,2.15,0,0,1,.48-2.34L17.7,3.91a2.3,2.3,0,0,1,2.25,1.5,2.15,2.15,0,0,1-.48,2.34Z"></path><path d="M18.67,21.89a2.3,2.3,0,0,1-2.25-1.5,2.15,2.15,0,0,1,.48-2.34L3.76,2.11A2.3,2.3,0,0,1,6.01.61a2.15,2.15,0,0,1-.48,2.34Z"></path></svg> <span className="ml-3 text-xl font-bold">Admin Panel</span> </div>{sidebarContent}</aside><div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div></div>
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"><svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                    <div className="flex flex-1 items-center justify-end space-x-4"><span className="text-sm font-medium text-gray-700">Welcome, {user.name || 'User'}!</span><Link href={route('home')} className="flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors" title="Homepage"><Home className="h-5 w-5" /></Link><Link href={route('logout')} method="post" as="button" className="flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-colors" title="Log Out"><LogOut className="h-5 w-5" /></Link></div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {/* 👇 Add this notification logic */}
                    {flash?.success && (
                        <div className="mb-4 rounded-md bg-green-50 p-4 shadow">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{flash.success}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}