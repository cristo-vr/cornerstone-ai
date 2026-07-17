import type { Metadata } from 'next';
import OSSprintPage from '@/components/os-sprint/OSSprintPage';

export const metadata: Metadata = {
    title: 'The OS Sprint',
    description:
        'Eight weeks. One operating system for your business, built with you and owned by you. What it is, why it exists, who it is for, and how the sprint works.',
    alternates: {
        canonical: 'https://cornerstone-ai.pro/the-os-sprint',
    },
    openGraph: {
        title: 'The OS Sprint | Cornerstone AI',
        description:
            'Eight weeks. One operating system for your business, built with you and owned by you.',
        url: 'https://cornerstone-ai.pro/the-os-sprint',
    },
};

export default function Page() {
    return <OSSprintPage />;
}
