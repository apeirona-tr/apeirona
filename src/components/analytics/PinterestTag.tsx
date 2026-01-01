'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PINTEREST_TAG_ID, pinterestEvents } from '@/lib/analytics';

export function PinterestTag() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pinterestEvents.pageVisit();
    }
  }, [pathname]);

  if (!PINTEREST_TAG_ID) {
    return null;
  }

  return (
    <>
      {/* Pinterest Tag */}
      <Script
        id="pinterest-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '${PINTEREST_TAG_ID}');
            pintrk('page');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://ct.pinterest.com/v3/?event=init&tid=${PINTEREST_TAG_ID}&noscript=1`}
        />
      </noscript>
    </>
  );
}

export default PinterestTag;

