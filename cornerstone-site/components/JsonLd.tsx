import React from 'react';
import { siteConfig } from '@/lib/config';

const JsonLd = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": siteConfig.name,
        "description": siteConfig.description,
        "url": siteConfig.url,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": siteConfig.address.country,
            "addressRegion": siteConfig.address.region
        },
        "areaServed": {
            "@type": "Country",
            "name": siteConfig.address.region
        },
        "serviceType": siteConfig.services,
        "priceRange": "$$$" // Placeholder
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
};

export default JsonLd;
