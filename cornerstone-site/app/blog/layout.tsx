import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050510] relative text-white">
            {/* Background styling for consistency with the main site */}
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#050510] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] pointer-events-none" />

            {/* Blog Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-2xl">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Cornerstone AI
                    </Link>
                    <div className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
                        Blog
                    </div>
                </div>
            </nav>

            {/* Blog Content */}
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative z-10 w-full animate-in fade-in duration-700">
                {children}
            </main>
        </div>
    );
}
