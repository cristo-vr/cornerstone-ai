import type { Metadata } from "next";
import WorkshopPage from "@/components/sections/workshop/WorkshopPage";
import { siteConfig } from "@/lib/config";

const TITLE = "The Workshop";
const DESCRIPTION =
  "Eight weeks of tactical training in how to operate with AI. You come out able to look at any part of how your business runs and know what AI can take, with three working systems already running. Two sessions a week, max eight businesses, $2,000 a seat. Five hours a week back per seat, measured, or the seat runs free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
    url: `${siteConfig.url}/workshop`,
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
  alternates: { canonical: `${siteConfig.url}/workshop` },
};

export default function Workshop() {
  return <WorkshopPage />;
}
