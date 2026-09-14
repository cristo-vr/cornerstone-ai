import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Root directory for all blog content
const blogDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPostMetaData = {
    slug: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    [key: string]: any;
};

export type BlogPost = {
    metadata: BlogPostMetaData;
    content: string;
};

/**
 * Retrieves a list of all raw slugs (.mdx filenames) from the blog directory.
 */
function getPostSlugs(): string[] {
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }
    return fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
}

/**
 * Parses an individual MDX file based on its slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        metadata: {
            slug: realSlug,
            title: data.title || '',
            description: data.description || '',
            date: data.date || '',
            image: data.image,
            ...data,
        },
        content,
    };
}

/**
 * Retrieves all valid blog posts sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is BlogPost => post !== null)
        .sort((post1, post2) => {
            // Sort in descending order by date (newest first)
            if (post1.metadata.date > post2.metadata.date) return -1;
            if (post1.metadata.date < post2.metadata.date) return 1;
            return 0;
        });

    return posts;
}
