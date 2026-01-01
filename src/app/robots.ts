import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apeirona.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/hesabim/',
          '/odeme/',
          '/siparis-takip/',
          '/sepet/',
          '/*.json$',
          '/*?*sort=',
          '/*?*filter=',
          '/*?*page=',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/hesabim/',
          '/odeme/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/images/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

