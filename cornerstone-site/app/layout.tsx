import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import BrandDefs from "@/components/brand/BrandDefs";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import { siteConfig } from "@/lib/config";

/**
 * Cloudflare Web Analytics beacon token.
 *
 * ⚠ LEAVE THIS UNSET. As of 2026-08-05 the cornerstone-ai.pro site has Web
 * Analytics enabled with **automatic injection**, so Cloudflare already injects
 * the beacon at the edge. Setting NEXT_PUBLIC_CF_BEACON_TOKEN would put a SECOND
 * beacon on every page and double-count every page view — which is the same
 * genre of wrong number this whole surface was built to get rid of.
 *
 * Verify which is true before changing it. Auto-injection only fires for
 * browser-like requests, so a plain curl will wrongly look like no beacon:
 *
 *   curl -s -A "Mozilla/5.0 ... Chrome/126.0.0.0 Safari/537.36" \
 *     https://cornerstone-ai.pro/ | grep -o 'data-cf-beacon[^>]*'
 *
 * This block exists as the fallback for if auto-injection is ever switched off
 * (Cloudflare dash → Web Analytics → the site → "Enable with JS Snippet
 * installation"). Only then does this token get set.
 *
 * ⚠ The beacon `token` is NOT the `siteTag` the GraphQL API filters on. On this
 * site they are different values — beacon 4313579f…, siteTag 7e7773bd…. The OS
 * setting `cloudflare_rum_site_tag` wants the siteTag (visible in the dashboard
 * URL), never the beacon token.
 */
const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "";

/* Brand Pack v2 type: condensed industrial display + humanist body. */
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const titleDefault =
  "Cornerstone AI: your business needs an operating system. We build it.";

/* Light-only: the site ships Cool Concrete to everyone, so the browser chrome
   should match it even on a dark-mode device. */
export const viewport: Viewport = {
  themeColor: "#EAEAE6",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: titleDefault,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Cornerstone AI. Right now, your business runs on you.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.description,
    images: ["/images/og.jpg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Scroll reveals are driven by JS. If it never runs, the server-rendered
            opacity:0 would hide the page, so force everything visible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body
        className={`${bigShoulders.variable} ${hanken.variable} antialiased bg-background text-foreground font-sans`}
      >
        <BrandDefs />
        {children}
        <JsonLd />
        <SiteAnalytics />
        {CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
