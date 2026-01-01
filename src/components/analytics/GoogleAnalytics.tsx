'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { GA_TRACKING_ID, pageview } from '@/lib/analytics';

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'max-age=7200;secure;samesite=none',
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  );
}

export default GoogleAnalytics;

