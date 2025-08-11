import { getSEOData, generateStructuredData, SEOData } from '@/lib/seo-utils';

interface PageSEOProps {
  pagePath: string;
  locale: string;
  fallback: {
    title: string;
    description: string;
  };
}

/**
 * Server-side SEO component that injects structured data and additional meta tags
 */
export default async function PageSEO({ pagePath, locale, fallback }: PageSEOProps) {
  // Fetch SEO data from database
  const seoData = await getSEOData(pagePath, locale);
  
  // Generate structured data
  const structuredDataScript = generateStructuredData(seoData, {
    title: fallback.title,
    description: fallback.description,
    locale,
    pagePath,
  });

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataScript,
        }}
      />

      {/* Additional meta tags that can't be handled by Next.js metadata */}
      {seoData?.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}
      
      {/* Google Site Verification */}
      {process.env.GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Bing Site Verification */}
      {process.env.BING_SITE_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.BING_SITE_VERIFICATION} />
      )}

      {/* Additional SEO meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#112Ef4" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://rmzwbozxbepjfonhmgfv.supabase.co" />

      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}
