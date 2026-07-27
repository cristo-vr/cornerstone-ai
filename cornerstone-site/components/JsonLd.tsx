import React from 'react';
import { siteConfig } from '@/lib/config';
import { faqs } from '@/lib/faqs';

/**
 * Everything lives on one page now, so the FAQ schema rides along with the
 * service schema rather than sitting on a separate route.
 */
const JsonLd = () => {
    const service = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "founder": {
            "@type": "Person",
            "name": siteConfig.founder.name,
            "jobTitle": siteConfig.founder.role,
            "url": siteConfig.founder.url
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": siteConfig.address.country,
            "addressRegion": siteConfig.address.region
        },
        "areaServed": [
            { "@type": "Country", "name": "South Africa" },
            { "@type": "Country", "name": "United States" }
        ],
        "knowsAbout": [
            "Custom Business Operating Systems",
            "Operations Automation",
            "AI Implementation for Small Businesses",
            "Business Process Automation",
            "Client Acquisition Automation",
            "Custom Software Development",
            "Business Operations Platforms",
            "Workflow Automation"
        ],
        "serviceType": siteConfig.services,
        "offers": {
            "@type": "Offer",
            "name": "The eight-week OS build",
            "price": "5500",
            "priceCurrency": "USD",
            "description":
                "A fixed-scope eight-week build of a custom operating system for your business, built inside your own accounts and handed over in full. $4,950 if paid up front."
        },
        "priceRange": "$$$"
    };

    const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
            />
        </>
    );
};

export default JsonLd;
