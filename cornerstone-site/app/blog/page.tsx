import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
    title: 'Blog | Cornerstone AI',
    description: 'Read the latest thoughts and updates from Cornerstone AI.',
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="space-y-16">
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    Latest Updates
                </h1>
                <p className="text-lg text-white/60 max-w-2xl">
                    Insights, news, and technical deep dives from the Cornerstone AI team.
                </p>
            </div>

            <div className="grid gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.metadata.slug}
                        href={`/blog/${post.metadata.slug}`}
                        className="group block rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 hover:bg-white/5 hover:border-white/10 transition-all duration-500 backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6 mb-6">
                            <div className="text-sm font-medium tracking-widest text-blue-400/80 uppercase">
                                {post.metadata.date
                                    ? new Date(post.metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : 'Undated'}
                            </div>
                        </div>

                        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                            {post.metadata.title}
                        </h2>

                        <p className="relative z-10 text-white/60 leading-relaxed text-lg max-w-3xl">
                            {post.metadata.description}
                        </p>
                    </Link>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-24 bg-white/[0.02] rounded-3xl border border-white/5 border-dashed">
                        <p className="text-white/60 text-lg">No blog posts found yet.</p>
                        <p className="text-white/40 mt-2 text-sm">Add an MDX file to <code className="bg-black/50 px-2 py-1 rounded text-white/70">content/blog</code> to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
