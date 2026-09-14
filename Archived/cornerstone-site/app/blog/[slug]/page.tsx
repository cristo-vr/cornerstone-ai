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
            <header className="mb-14 border-b border-line pb-10">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-5">
                    {post.metadata.date
                        ? new Date(post.metadata.date).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                        : 'Undated'}
                </p>
                <h1 className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[0.005em] text-foreground mb-7">
                    {post.metadata.title}
                </h1>
                {post.metadata.description && (
                    <p className="text-xl text-ink-2 leading-relaxed">
                        {post.metadata.description}
                    </p>
                )}
            </header>

            <div className="prose-concrete max-w-none">
                <MDXRemote source={post.content} components={MDXComponents} />
            </div>
        </article>
    );
}
