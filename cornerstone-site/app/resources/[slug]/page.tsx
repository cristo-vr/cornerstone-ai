import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import Prose from "@/components/resources/Prose";
import DownloadGate from "@/components/resources/DownloadGate";
import { LibraryFooter, LibraryHeader } from "@/components/resources/LibraryChrome";
import { fileSize, fileUrl, getResource, getResources, KIND_LABEL } from "@/lib/resources";
import { siteConfig } from "@/lib/config";

// Static export: every published resource becomes a real HTML file at build
// time. That is what makes these pages indexable and instant, and it is why
// publishing in the panel is followed by a rebuild.
export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) return { title: "Not found" };

  const description = resource.summary ?? `A free ${KIND_LABEL[resource.kind].toLowerCase()} from Cornerstone AI.`;
  const url = `${siteConfig.url}/resources/${resource.slug}`;

  return {
    title: resource.title,
    description,
    openGraph: {
      title: `${resource.title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | ${siteConfig.name}`,
      description,
      images: ["/images/og.jpg"],
    },
    alternates: { canonical: url },
  };
}

/** Turn a YouTube or Loom URL into its embed form. Anything else is left alone
 *  and rendered as a plain link rather than dropped into an iframe. */
function embedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    if (/(^|\.)youtube\.com$/.test(url.hostname)) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${url.pathname}`;
    }
    if (/(^|\.)loom\.com$/.test(url.hostname)) {
      return raw.replace("/share/", "/embed/");
    }
    return null;
  } catch {
    return null;
  }
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = await getResource(slug);
  if (!resource) notFound();

  const href = fileUrl(resource);
  const embed = resource.video_url ? embedUrl(resource.video_url) : null;
  const others = (await getResources()).filter((r) => r.slug !== resource.slug).slice(0, 2);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <LibraryHeader />

      <main className="mx-auto max-w-3xl px-6">
        <div className="pt-10">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            All resources
          </Link>
        </div>

        <article className="pt-8">
          <Reveal>
            <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-dk">
              <FileText className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              {KIND_LABEL[resource.kind]}
              {resource.file_size ? <span className="text-muted">· {fileSize(resource.file_size)}</span> : null}
            </span>

            <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,3.5rem)] font-extrabold uppercase leading-[0.96] tracking-[0.005em]">
              {resource.title}
            </h1>

            {resource.summary && (
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{resource.summary}</p>
            )}
          </Reveal>

          {href && (
            <div className="mt-8">
              <DownloadGate
                slug={resource.slug}
                href={href}
                fileName={resource.file_name}
                requiresEmail={resource.requires_email}
                label={resource.external_url ? "Open it" : "Download it"}
              />
            </div>
          )}

          {embed && (
            <div className="mt-12 overflow-hidden rounded-xl border border-line">
              <div className="relative aspect-video">
                <iframe
                  src={embed}
                  title={`${resource.title} walkthrough`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {resource.description && (
            <section className="mt-12">
              <Prose>{resource.description}</Prose>
            </section>
          )}

          {resource.how_to && (
            <section className="mt-12 rounded-xl border border-line bg-surface/60 p-6 md:p-8">
              <Eyebrow>How to use it</Eyebrow>
              <div className="mt-5">
                <Prose>{resource.how_to}</Prose>
              </div>
            </section>
          )}

          {href && (
            <div className="mt-12 border-t border-line pt-10">
              <DownloadGate
                slug={resource.slug}
                href={href}
                fileName={resource.file_name}
                requiresEmail={resource.requires_email}
                label={resource.external_url ? "Open it" : "Download it"}
              />
            </div>
          )}
        </article>

        <section className="mt-20 rounded-xl border border-line bg-surface/60 p-8 md:p-10">
          <Eyebrow>Get the next one</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-[1.04] tracking-[0.005em] md:text-3xl">
            One system a week, free
          </h2>
          <p className="mb-6 mt-3 leading-relaxed text-ink-2">
            Simple Systems Saturday is one job in your business, taken apart and rebuilt, in plain English. New
            resources go out on it too.
          </p>
          <NewsletterForm cta="Send me Saturday's issue" />
        </section>

        {others.length > 0 && (
          <section className="mt-16">
            <Eyebrow>Also in the library</Eyebrow>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.map((r) => (
                <Link
                  key={r.id}
                  href={`/resources/${r.slug}`}
                  className="ease-[var(--ease-out)] rounded-xl border border-line bg-surface/60 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary"
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-dk">
                    {KIND_LABEL[r.kind]}
                  </span>
                  <p className="mt-2.5 font-display text-lg font-bold uppercase leading-[1.06] tracking-[0.005em]">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <LibraryFooter />
    </div>
  );
}
