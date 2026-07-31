import type { Metadata } from "next";
import WorkshopPage from "@/components/sections/workshop/WorkshopPage";
import { siteConfig } from "@/lib/config";

const TITLE = "The Workshop";
const DESCRIPTION =
  "Eight weeks of building. You'll come out knowing what AI can do inside your business, able to build it yourself, with three working systems running. Two sessions a week, max eight businesses, $2,000 a seat. Five hours a week back per seat, measured, or the seat runs free.";

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
