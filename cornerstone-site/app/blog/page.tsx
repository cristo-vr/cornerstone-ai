import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "Blog",
  description: "Notes on building operating systems for founder-led businesses.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-14">
      <header className="space-y-5">
        <h1 className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-bold uppercase leading-[0.9] tracking-[0.005em] text-foreground">
          Notes from the build
        </h1>
        <p className="text-lg text-ink-2 max-w-2xl leading-relaxed">
          What we&apos;re learning building operating systems for founder-led businesses.
        </p>
      </header>

      <div className="border-t border-line">
        {posts.map((post) => (
          <Link
            key={post.metadata.slug}
            href={`/blog/${post.metadata.slug}`}
            className="group block border-b border-line py-8 transition-colors duration-300 hover:bg-surface/50"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent-ink mb-3">
              {post.metadata.date
                ? new Date(post.metadata.date).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Undated"}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-[0.005em] text-foreground mb-3 group-hover:text-accent-ink transition-colors duration-200">
              {post.metadata.title}
            </h2>
            {post.metadata.description && (
              <p className="text-ink-2 leading-relaxed max-w-2xl mb-4">
                {post.metadata.description}
              </p>
            )}
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-ink">
              Read
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </span>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="rounded-xl border border-dashed border-line bg-surface/40 py-20 text-center mt-8">
            <p className="text-ink-2">Nothing published yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
