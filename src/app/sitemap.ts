import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apeirona.com';

// Static pages
const staticPages = [
  '',
  '/urunler',
  '/kategoriler',
  '/planlayici-olustur',
  '/hakkimizda',
  '/iletisim',
  '/sikca-sorulan-sorular',
  '/kargo-ve-teslimat',
  '/iade-ve-degisim',
  '/gizlilik-politikasi',
  '/mesafeli-satis-sozlesmesi',
  '/giris',
  '/kayit',
];

// Categories
const categories = [
  'gunluk-planlayicilar',
  'haftalik-planlayicilar',
  'bullet-defterler',
  'sinava-hazirlik-defteri',
  'klasik-not',
  'to-do-listler',
  'ozel-defter-setleri',
  'diyet-planlayicilar',
  'planlama-setleri',
  'cizgisiz-defterler',
  'cizgili-kareli-defterler',
  '3lu-defter-setleri',
  'noktali-defter-setleri',
  'masaustu-planlayicilar',
  'seyahat-planlayicilar',
  'kalem-kalemlik',
  'kraft-urunler',
  'kitap-okuma-defteri',
  'spor-diyet-defterleri',
];

// Series
const series = [
  'gunes-daglari-serisi',
  'ikebana-serisi',
  'hakugawa-serisi',
  'takeda-serisi',
  'botanik-serisi',
  'ganba-serisi',
  'muzur-kediler-serisi',
  'potter-serisi',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPageEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  // Category pages
  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/urunler?kategori=${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Series pages
  const seriesEntries: MetadataRoute.Sitemap = series.map((seriesItem) => ({
    url: `${BASE_URL}/seriler/${seriesItem}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // In production, fetch products from database
  // const products = await fetchProducts();
  // const productEntries = products.map((product) => ({
  //   url: `${BASE_URL}/urun/${product.slug}`,
  //   lastModified: product.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  // Demo product entries
  const demoProducts = [
    'haftalik-planlayici-kizil-gunes',
    '2024-yillik-planlayici-botanik',
    'a5-noktali-defter-minimal',
    'premium-kalem-seti-rose-gold',
  ];

  const productEntries: MetadataRoute.Sitemap = demoProducts.map((slug) => ({
    url: `${BASE_URL}/urun/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPageEntries,
    ...categoryEntries,
    ...seriesEntries,
    ...productEntries,
  ];
}

