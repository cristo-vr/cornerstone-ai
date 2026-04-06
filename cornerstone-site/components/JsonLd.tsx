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
            "Custom Operating Systems for Businesses",
            "Operations Automation",
            "AI Implementation for Founder-Led Businesses",
            "Business Process Automation",
            "Client Acquisition Automation",
            "Custom Software Development",
            "Business Operations Platforms",
            "Workflow Automation"
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
