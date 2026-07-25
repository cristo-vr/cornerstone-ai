import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-line bg-background/85 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-[68px] flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Back to Cornerstone</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Logo markClassName="w-6 h-6" wordClassName="text-lg" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">{children}</main>

      <footer className="border-t border-line">
        <div className="max-w-4xl mx-auto px-6 py-10 text-xs text-ink-2">
          © {new Date().getFullYear()} Cornerstone AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
