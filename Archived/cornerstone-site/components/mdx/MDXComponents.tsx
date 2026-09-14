/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";

/** Long-form MDX rendered in the v2 concrete language. */
export const MDXComponents = {
  h1: (props: any) => (
    <h1
      className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold uppercase leading-[0.92] tracking-[0.005em] text-foreground mt-14 mb-6"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold uppercase leading-[0.96] tracking-[0.005em] text-foreground mt-12 mb-4 pb-3 border-b border-line"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="font-display text-xl md:text-2xl font-bold uppercase tracking-[0.005em] text-foreground mt-9 mb-3"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="text-lg leading-relaxed text-ink-2 mb-6" {...props} />
  ),
  a: ({ href, ...props }: any) => (
    <Link
      href={href || "/"}
      className="text-accent-ink underline underline-offset-[3px] hover:text-accent-ink transition-colors"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="list-disc marker:text-accent-ink text-lg leading-relaxed text-ink-2 mb-6 pl-6 space-y-2"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal marker:text-accent-ink text-lg leading-relaxed text-ink-2 mb-6 pl-6 space-y-2"
      {...props}
    />
  ),
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => (
    <blockquote className="my-9 border-l-2 border-primary pl-6" {...props}>
      <div className="font-display text-2xl font-bold uppercase leading-[1.06] tracking-[0.005em] text-foreground">
        {props.children}
      </div>
    </blockquote>
  ),
  code: (props: any) => {
    const isInline =
      typeof props.children === "string" && !props.children.includes("\n");
    return isInline ? (
      <code
        className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[0.9em] text-foreground"
        {...props}
      />
    ) : (
      <code className="block overflow-x-auto text-sm text-foreground" {...props} />
    );
  },
  pre: (props: any) => (
    <pre
      className="my-7 overflow-x-auto rounded-xl border border-line bg-surface p-5 text-sm"
      {...props}
    />
  ),
  img: (props: any) => (
    <figure className="my-9">
      <div className="overflow-hidden rounded-xl border border-line">
        {/* MDX images have unknown intrinsic size, so a plain img is correct here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-auto object-cover"
          alt={props.alt || ""}
          loading="lazy"
          decoding="async"
          {...props}
        />
      </div>
      {props.alt && (
        <figcaption className="mt-3 text-center text-sm text-ink-2">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  hr: (props: any) => <hr className="my-12 border-line" {...props} />,
  strong: (props: any) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};
