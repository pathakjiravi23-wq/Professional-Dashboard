import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import CardNav from '@/Components/CardNav';
import RotatingText from '@/Components/RotatingText';

// It's good practice to define constants like this outside the component
// if they don't depend on props or state.
const navItems = [
    {
        label: 'Products',
        bgColor: '#FFD700',
        textColor: '#000',
        links: [
            { label: 'Cloud Hosting', href: '#' },
            { label: 'Web Security', href: '#' },
        ],
    },
    {
        label: 'Resources',
        bgColor: '#00BFFF',
        textColor: '#fff',
        links: [
            { label: 'Documentation', href: '#' },
            { label: 'API Reference', href: '#' },
        ],
    },
    {
        label: 'Company',
        bgColor: '#32CD32',
        textColor: '#fff',
        links: [
            { label: 'About Us', href: '#' },
            { label: 'Contact', href: '#' },
        ],
    },
];

// ✅ CORRECT: Only one function declaration that accepts both 'auth' and 'posts'
export default function Welcome({ auth, posts }) {
    const pageStyle = {
        background: 'linear-gradient(to right, #d7d2cc, #304352)',
    };
    // Function to format date like "Mar 16, 2020"
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div style={pageStyle} className="min-h-screen w-full text-white overflow-x-hidden">
            <Head title="Welcome" />

            {/* This CardNav will now work correctly */}
            <CardNav
                logo="/your-logo.svg"
                items={navItems}
                auth={auth}
                menuColor="#080808ff"
                buttonBgColor="#040404ff"
                buttonTextColor="#fff"
            />

            {/* Main Content Area */}
            <main className="container mx-auto px-4 py-24 mt-20">
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <motion.div
                        layout
                        transition={{
                            type: "tween",
                            ease: "easeInOut",
                            duration: 0.5,
                        }}
                        className="flex items-baseline justify-center text-4xl sm:text-5xl md:text-6xl font-bold"
                    >
                        <span className="text-gray-700 mr-4">Creative</span>
                        <RotatingText
                            texts={['thinking', 'thoughts', 'Blogs!']}
                            mainClassName="bg-gray-900 text-white px-4 rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden py-1"
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                            rotationInterval={2000}
                        />
                    </motion.div>
                    <p className="mt-4 text-lg text-zinc-800">Explore the latest articles from our authors.</p>
                </div>
                <div className="mt-8">
                    <h2 className="text-3xl font-bold mb-8 flex items-center ml-14">
                        <span className="block w-12 h-0.5 bg-gray-900 mr-4 rounded-full"></span>
                        <span className="text-zinc-950">Latest Posts</span>
                    </h2>
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* 👇 REPLACED BLOG POST CARD LOGIC 👇 */}
                            {posts.map((post) => (
                                <Link href={route('posts.show', post.id)} key={post.id} className="group flex flex-col bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20">
                                    <div>
                                        <img
                                            src={`/storage/${post.featured_image}`}
                                            alt={post.title}
                                            className="w-full h-56 object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow p-6">
                                        <div>
                                            <div className="flex items-center text-sm mb-3">
                                                <span className="text-gray-400">{formatDate(post.created_at)}</span>
                                                <span className="mx-2 text-gray-500">&bull;</span>
                                                <span className="inline-block bg-indigo-500/20 text-indigo-300 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                                            <p className="text-gray-400 line-clamp-3">{post.content}</p>
                                        </div>
                                        <div className="flex items-center mt-6 pt-4 border-t border-gray-700">
                                            {post.user ? (
                                                <>
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover mr-3"
                                                        // Using a placeholder avatar service
                                                        src={`https://ui-avatars.com/api/?name=${post.user.name.replace(' ', '+')}&background=random`}
                                                        alt={post.user.name}
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-200">{post.user.name}</p>
                                                        <p className="text-sm text-gray-500">Author</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-600 mr-3"></div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No posts have been created yet. Go to your dashboard to add one!</p>
                    )}
                </div>
            </main>
        </div>
    );
}