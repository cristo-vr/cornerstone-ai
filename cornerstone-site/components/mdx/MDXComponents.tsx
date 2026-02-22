import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const MDXComponents = {
    h1: (props: any) => (
        <h1
            className="text-4xl font-extrabold tracking-tight text-white mb-6 mt-10 md:text-5xl lg:text-6xl"
            {...props}
        />
    ),
    h2: (props: any) => (
        <h2
            className="text-3xl font-bold tracking-tight text-white/90 mb-4 mt-8 pb-2 border-b border-white/10"
            {...props}
        />
    ),
    h3: (props: any) => (
        <h3
            className="text-2xl font-semibold tracking-tight text-white/80 mb-4 mt-6"
            {...props}
        />
    ),
    p: (props: any) => (
        <p
            className="leading-relaxed text-white/70 mb-6 text-lg"
            {...props}
        />
    ),
    a: (props: any) => (
        <Link
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-500/80 transition-all"
            href={props.href || '#'}
            {...props}
        />
    ),
    ul: (props: any) => (
        <ul className="list-disc leading-relaxed text-white/70 mb-6 pl-6 space-y-2 text-lg" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal leading-relaxed text-white/70 mb-6 pl-6 space-y-2 text-lg" {...props} />
    ),
    li: (props: any) => <li className="" {...props} />,
    blockquote: (props: any) => (
        <blockquote
            className="my-8 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:to-purple-500/10"
            {...props}
        >
            <div className="relative z-10 text-xl italic text-white/90">
                "{props.children}"
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />
        </blockquote>
    ),
    code: (props: any) => {
        // If inline code
        if (typeof props.children === 'string' && !props.children.includes('\n')) {
            return (
                <code
                    className="rounded-md border border-white/10 bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm text-blue-200"
                    {...props}
                />
            );
        }
        // Block code (usually handled by pre, but just in case)
        return (
            <code
                className="block rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-sm text-white/90 overflow-x-auto"
                {...props}
            />
        );
    },
    pre: (props: any) => (
        <pre
            className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0d1117] p-4 text-sm shadow-xl"
            {...props}
        />
    ),
    img: (props: any) => {
        return (
            <div className="my-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-white/5">
                {/* We use standard img for simplicity here due to MDX unknown image sizes, 
            but in a real scenario we'd use next/image with fixed or layout fill */}
                <img
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                    alt={props.alt || 'Blog Image'}
                    {...props}
                />
                {props.alt && (
                    <div className="p-3 text-center text-sm text-white/50 border-t border-white/5 bg-black/20">
                        {props.alt}
                    </div>
                )}
            </div>
        );
    },
    hr: (props: any) => <hr className="my-12 border-white/10" {...props} />,
    strong: (props: any) => <strong className="font-bold text-white/95" {...props} />,
};
