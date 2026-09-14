import type { Metadata } from "next";
import ReferralsShell from "@/components/sections/referrals/ReferralsShell";
import { siteConfig } from "@/lib/config";

const TITLE = "Referrals: send someone my way and you both get two extra weeks";
const DESCRIPTION =
  "If someone you introduce becomes a client, I add two weeks of building to their engagement and two weeks to yours. No commission, no codes, and their price stays the same.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}/referrals`,
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
  alternates: { canonical: `${siteConfig.url}/referrals` },
};

export default function ReferralsPage() {
  return <ReferralsShell />;
}
