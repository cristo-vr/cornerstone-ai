import type { Metadata } from "next";
import BuildShell from "@/components/sections/build/BuildShell";
import { siteConfig } from "@/lib/config";

const TITLE = "The Build: eight weeks of building, aimed at your business";
const DESCRIPTION =
  "Eight weeks of build capacity pointed at whatever your business needs, then four more weeks of support. Answers and fixes inside 24 hours, new builds live within seven days. Built on your accounts and yours at the end. $6,000.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}/build`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    images: ["/images/og.jpg"],
  },
  alternates: { canonical: `${siteConfig.url}/build` },
};

export default function BuildPage() {
  return <BuildShell />;
}
