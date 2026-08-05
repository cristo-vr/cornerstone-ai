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
 * ⚠ This is what makes the traffic numbers in the OS real. Without it Cloudflare
 * has no page-load data at all, and the only numbers available are zone/Pages
 * REQUEST counts — every JS chunk, font, image, bot and prefetch — which read as
 * enormous and mean nothing. The OS deliberately refuses to show those.
 *
 * The token is public by design (it ships in the HTML of every page). Get it at
 * Cloudflare dashboard → Analytics & Logs → Web Analytics → the cornerstone-ai.pro
 * site → the JS snippet. Set it as NEXT_PUBLIC_CF_BEACON_TOKEN in the Pages build
 * environment, or paste it into the fallback below.
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
