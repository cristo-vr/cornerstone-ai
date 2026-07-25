import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import BrandDefs from "@/components/brand/BrandDefs";
import { siteConfig } from "@/lib/config";

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
  "Cornerstone AI — An AI Chief of Staff for Founder-Led Businesses";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EAEAE6" },
    { media: "(prefers-color-scheme: dark)", color: "#2B2A26" },
  ],
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
        alt: "Cornerstone AI — your next hire isn't a person",
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
      </body>
    </html>
  );
}
