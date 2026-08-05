import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { getResources } from '@/lib/resources'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url

    // Every published resource is a real page and the destination of links in
    // posts, so each one belongs in the sitemap. Built from the same source the
    // pages are, which means a resource cannot be live and unlisted.
    const resources = await getResources()

    return [
        {
            url: `${baseUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...resources.map((r) => ({
            url: `${baseUrl}/resources/${r.slug}`,
            lastModified: r.published_at ? new Date(r.published_at) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/build`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/referrals`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/simple-systems-saturday`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/refund-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]
}
