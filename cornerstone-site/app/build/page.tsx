import type { Metadata } from "next";
import BuildShell from "@/components/sections/build/BuildShell";
import { siteConfig } from "@/lib/config";

const TITLE = "The Build: eight weeks to a system your business owns";
const DESCRIPTION =
  "A custom AI system built around how your business actually runs. It drafts the quote, chases the invoice and writes the Monday report. Eight weeks, on your accounts, permissioned for your team, yours at the end. $5,500.";

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
