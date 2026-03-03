import React from 'react';
import { siteConfig } from '@/lib/config';

const JsonLd = () => {
    const structuredData = {
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
            {
                "@type": "Country",
                "name": "South Africa"
            },
            {
                "@type": "Country",
                "name": "United States"
            }
        ],
        "knowsAbout": [
            "Operations Automation",
            "AI for Financial Services",
            "Practice Management Automation",
            "Accounting Firm Automation",
            "Insurance Brokerage Operations",
            "Financial Advisory Practice Systems",
            "Client Acquisition Automation",
            "Business Process Automation"
        ],
        "serviceType": siteConfig.services,
        "priceRange": "$$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default JsonLd;
