import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate metadata dynamically using the MDX frontmatter
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.metadata.title,
        description: post.metadata.description,
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.description,
            type: 'article',
            publishedTime: post.metadata.date,
        }
    };
}

// Support for Next.js static exports
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.metadata.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto">
            <header className="mb-16 border-b border-white/5 pb-10">
                <div className="text-sm tracking-widest text-blue-400/80 font-medium uppercase mb-6">
                    {post.metadata.date
                        ? new Date(post.metadata.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                        : 'Undated'}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                    {post.metadata.title}
                </h1>
                {post.metadata.description && (
                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                        {post.metadata.description}
                    </p>
                )}
            </header>

            {/* Render the MDX using next-mdx-remote and high-tech custom components */}
            <div className="prose prose-invert max-w-none text-white/80">
                <MDXRemote source={post.content} components={MDXComponents} />
            </div>
        </article>
    );
}
