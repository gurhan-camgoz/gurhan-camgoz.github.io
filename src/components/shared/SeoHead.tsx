import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
    title: string;
    description: string;
    path?: string;
}

/**
 * Reusable SEO Head component using react-helmet-async.
 * Sets the page title, meta description, and Open Graph tags.
 */
export function SeoHead({ title, description, path = '' }: SeoHeadProps) {
    const siteUrl = 'https://gurhan-camgoz.github.io';
    const fullUrl = `${siteUrl}${path}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
}
