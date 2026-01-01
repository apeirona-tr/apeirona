// SEO Configuration & Utilities
import { Metadata } from 'next';

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  twitterHandle: string;
  facebookAppId: string;
  locale: string;
  themeColor: string;
}

export const seoConfig: SEOConfig = {
  siteName: 'Apeirona',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://apeirona.com',
  defaultTitle: 'Apeirona - Sınırsız Sanat | Planlayıcı & Kırtasiye',
  titleTemplate: '%s | Apeirona',
  defaultDescription: 'Kendi planlayıcınızı tasarlayın! Kaliteli planlayıcı defterler, ajandalar, bullet journal ve kırtasiye ürünleri. Türkiye\'nin en yaratıcı kırtasiye markası.',
  defaultKeywords: [
    'planlayıcı',
    'ajanda',
    'defter',
    'bullet journal',
    'kırtasiye',
    'haftalık planlayıcı',
    'günlük planlayıcı',
    'özel tasarım defter',
    'kişiselleştirilmiş planlayıcı',
    'apeirona',
  ],
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@apeirona',
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  locale: 'tr_TR',
  themeColor: '#8B7355',
};

// Generate page metadata
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const pageDescription = description || seoConfig.defaultDescription;
  const pageImage = image || seoConfig.defaultImage;
  const pageUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const pageKeywords = keywords?.length ? keywords : seoConfig.defaultKeywords;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: author ? [{ name: author }] : [{ name: seoConfig.siteName }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: pageUrl,
      languages: {
        'tr-TR': pageUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: seoConfig.locale,
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: seoConfig.twitterHandle,
      site: seoConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'e-commerce',
  };
}

// Product structured data
export function generateProductSchema(product: {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  currency?: string;
  sku: string;
  brand?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${seoConfig.siteUrl}${product.image}`,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || seoConfig.siteName,
    },
    offers: {
      '@type': 'Offer',
      url: `${seoConfig.siteUrl}${product.url}`,
      priceCurrency: product.currency || 'TRY',
      price: product.discountPrice || product.price,
      ...(product.discountPrice && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }),
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: seoConfig.siteName,
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

// Organization structured data
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/images/logo.png`,
    description: seoConfig.defaultDescription,
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'Apeirona Team',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İstanbul',
      addressCountry: 'TR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+90-555-123-4567',
        contactType: 'customer service',
        availableLanguage: ['Turkish', 'English'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/apeirona',
      'https://www.instagram.com/apeirona',
      'https://twitter.com/apeirona',
      'https://www.pinterest.com/apeirona',
      'https://www.tiktok.com/@apeirona',
    ],
  };
}

// Breadcrumb structured data
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  };
}

// Website structured data
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/arama?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Local Business structured data
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    image: `${seoConfig.siteUrl}/images/store.jpg`,
    description: seoConfig.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kadıköy',
      addressLocality: 'İstanbul',
      addressRegion: 'İstanbul',
      postalCode: '34000',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9911,
      longitude: 29.0261,
    },
    telephone: '+90-555-123-4567',
    priceRange: '₺₺',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    currenciesAccepted: 'TRY',
  };
}

// FAQ structured data
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Collection/Category structured data
export function generateCollectionSchema(collection: {
  name: string;
  description: string;
  url: string;
  products: { name: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: `${seoConfig.siteUrl}${collection.url}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: collection.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.name,
        url: `${seoConfig.siteUrl}${product.url}`,
      })),
    },
  };
}

