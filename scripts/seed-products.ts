import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Product Schema (inline for script)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String },
  images: [{ type: String }],
  variants: [{
    name: String,
    options: [String],
    prices: [Number]
  }],
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  tags: [{ type: String }],
  specifications: [{
    key: String,
    value: String
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Kategori Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

// Örnek Kategoriler
const categories = [
  {
    name: 'Planlayıcı Defterler',
    slug: 'planlayici-defterler',
    description: 'El yapımı, özgün tasarımlı planlayıcı defterler',
    image: '/images/categories/planlayici.jpg',
    order: 1
  },
  {
    name: 'Günlük Planlayıcılar',
    slug: 'gunluk-planlayicilar',
    description: 'Günlük planlamanızı kolaylaştıran defterler',
    image: '/images/categories/gunluk.jpg',
    order: 2
  },
  {
    name: 'Haftalık Planlayıcılar',
    slug: 'haftalik-planlayicilar',
    description: 'Haftalık görünümlü planlayıcılar',
    image: '/images/categories/haftalik.jpg',
    order: 3
  },
  {
    name: 'Bullet Journal',
    slug: 'bullet-journal',
    description: 'Noktalı ve çizgisiz bullet journal defterler',
    image: '/images/categories/bullet.jpg',
    order: 4
  },
  {
    name: 'Ajandalar',
    slug: 'ajandalar',
    description: 'Yıllık ve aylık ajandalar',
    image: '/images/categories/ajanda.jpg',
    order: 5
  },
  {
    name: 'Defterler',
    slug: 'defterler',
    description: 'Çizgili, kareli ve noktalı defterler',
    image: '/images/categories/defter.jpg',
    order: 6
  },
  {
    name: 'Kırtasiye',
    slug: 'kirtasiye',
    description: 'Kalemler, silgiler ve kırtasiye malzemeleri',
    image: '/images/categories/kirtasiye.jpg',
    order: 7
  },
  {
    name: 'Hediye Setleri',
    slug: 'hediye-setleri',
    description: 'Özel günler için hediye setleri',
    image: '/images/categories/hediye.jpg',
    order: 8
  },
  {
    name: 'Sticker & Washi Tape',
    slug: 'sticker-washi',
    description: 'Dekoratif çıkartmalar ve washi bantlar',
    image: '/images/categories/sticker.jpg',
    order: 9
  }
];

// Örnek Ürünler
const products = [
  // Planlayıcı Defterler
  {
    name: '2025 Yıllık Planlayıcı - Rose Gold',
    slug: '2025-yillik-planlayici-rose-gold',
    description: `
      <p>2025 yılı için özel olarak tasarlanmış, rose gold spiral detaylı yıllık planlayıcımız ile hayallerinizi gerçeğe dönüştürün.</p>
      <h3>Özellikler:</h3>
      <ul>
        <li>A5 boyut (14.8 x 21 cm)</li>
        <li>160 sayfa, 120gr ivory kağıt</li>
        <li>Rose gold metal spiral</li>
        <li>Sert kapak, laminasyonlu</li>
        <li>Aylık ve haftalık planlama sayfaları</li>
        <li>Hedef belirleme ve takip bölümleri</li>
        <li>Not sayfaları ve özel bölümler</li>
      </ul>
    `,
    shortDescription: 'Rose gold detaylı, 2025 yılı için özel tasarım yıllık planlayıcı.',
    price: 189,
    compareAtPrice: 229,
    sku: 'APR-PLN-2025-RG',
    category: 'Planlayıcı Defterler',
    subcategory: 'Yıllık Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800'
    ],
    stock: 50,
    isActive: true,
    isFeatured: true,
    isNew: true,
    tags: ['planlayıcı', '2025', 'rose gold', 'yıllık'],
    specifications: [
      { key: 'Boyut', value: 'A5 (14.8 x 21 cm)' },
      { key: 'Sayfa Sayısı', value: '160 sayfa' },
      { key: 'Kağıt Gramajı', value: '120gr ivory' },
      { key: 'Kapak', value: 'Sert kapak, laminasyonlu' },
      { key: 'Spiral', value: 'Rose gold metal' }
    ],
    seo: {
      metaTitle: '2025 Yıllık Planlayıcı Rose Gold | Apeirona',
      metaDescription: '2025 yılı için rose gold detaylı, el yapımı yıllık planlayıcı. A5 boyut, 160 sayfa, premium kalite.',
      keywords: ['2025 planlayıcı', 'yıllık planlayıcı', 'rose gold ajanda', 'apeirona']
    }
  },
  {
    name: '2025 Yıllık Planlayıcı - Midnight Blue',
    slug: '2025-yillik-planlayici-midnight-blue',
    description: `
      <p>Zarif midnight blue rengiyle 2025 yılınızı planlayın. Altın detaylarla bezeli şık tasarım.</p>
      <h3>Özellikler:</h3>
      <ul>
        <li>A5 boyut (14.8 x 21 cm)</li>
        <li>160 sayfa, 120gr ivory kağıt</li>
        <li>Altın rengi metal spiral</li>
        <li>Sert kapak, kadife dokulu</li>
        <li>Aylık ve haftalık planlama sayfaları</li>
      </ul>
    `,
    shortDescription: 'Midnight blue kadife kapak, altın spiral detaylı 2025 planlayıcı.',
    price: 199,
    compareAtPrice: 249,
    sku: 'APR-PLN-2025-MB',
    category: 'Planlayıcı Defterler',
    subcategory: 'Yıllık Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
    ],
    stock: 35,
    isActive: true,
    isFeatured: true,
    isNew: true,
    tags: ['planlayıcı', '2025', 'mavi', 'yıllık'],
    specifications: [
      { key: 'Boyut', value: 'A5 (14.8 x 21 cm)' },
      { key: 'Sayfa Sayısı', value: '160 sayfa' },
      { key: 'Kapak', value: 'Kadife dokulu sert kapak' },
      { key: 'Spiral', value: 'Altın rengi metal' }
    ]
  },
  // Günlük Planlayıcılar
  {
    name: 'Günlük Planlayıcı - Minimalist',
    slug: 'gunluk-planlayici-minimalist',
    description: `
      <p>Sade ve şık tasarımıyla günlük rutinlerinizi düzenleyin. Minimalist sevenlerin favorisi.</p>
      <ul>
        <li>A5 boyut</li>
        <li>90 sayfa (3 aylık kullanım)</li>
        <li>100gr beyaz kağıt</li>
        <li>Kraft kapak</li>
      </ul>
    `,
    shortDescription: 'Minimalist tasarımlı günlük planlayıcı, kraft kapak.',
    price: 79,
    compareAtPrice: null,
    sku: 'APR-DLY-MIN-001',
    category: 'Günlük Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800'
    ],
    stock: 100,
    isActive: true,
    isFeatured: false,
    isNew: false,
    tags: ['günlük', 'minimalist', 'kraft'],
    specifications: [
      { key: 'Boyut', value: 'A5' },
      { key: 'Sayfa Sayısı', value: '90 sayfa' }
    ]
  },
  {
    name: 'Günlük Planlayıcı - Çiçek Deseni',
    slug: 'gunluk-planlayici-cicek-deseni',
    description: `
      <p>Romantik çiçek desenleriyle süslenmiş günlük planlayıcı. Her güne renk katın.</p>
    `,
    shortDescription: 'Çiçek desenli romantik günlük planlayıcı.',
    price: 89,
    compareAtPrice: 109,
    sku: 'APR-DLY-FLR-001',
    category: 'Günlük Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 75,
    isActive: true,
    isFeatured: true,
    isNew: false,
    tags: ['günlük', 'çiçek', 'romantik']
  },
  // Haftalık Planlayıcılar
  {
    name: 'Haftalık Planlayıcı - Classic',
    slug: 'haftalik-planlayici-classic',
    description: `
      <p>Klasik tasarımlı haftalık planlayıcı. Her sayfada bir hafta görünümü.</p>
      <ul>
        <li>A5 boyut</li>
        <li>52 hafta (1 yıllık kullanım)</li>
        <li>120gr ivory kağıt</li>
        <li>Siyah sert kapak</li>
      </ul>
    `,
    shortDescription: 'Klasik siyah kapak, haftalık görünümlü planlayıcı.',
    price: 129,
    compareAtPrice: null,
    sku: 'APR-WKL-CLS-001',
    category: 'Haftalık Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800'
    ],
    stock: 60,
    isActive: true,
    isFeatured: false,
    isNew: false,
    tags: ['haftalık', 'klasik', 'siyah']
  },
  {
    name: 'Haftalık Planlayıcı - Pastel Serisi',
    slug: 'haftalik-planlayici-pastel',
    description: `
      <p>Pastel renklerle tasarlanmış haftalık planlayıcı. Soft tonlarla planlama keyfi.</p>
    `,
    shortDescription: 'Pastel renkli haftalık planlayıcı.',
    price: 139,
    compareAtPrice: 159,
    sku: 'APR-WKL-PST-001',
    category: 'Haftalık Planlayıcılar',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 45,
    isActive: true,
    isFeatured: true,
    isNew: true,
    tags: ['haftalık', 'pastel', 'renkli'],
    variants: [
      {
        name: 'Renk',
        options: ['Pembe', 'Mavi', 'Yeşil', 'Mor'],
        prices: [139, 139, 139, 139]
      }
    ]
  },
  // Bullet Journal
  {
    name: 'Bullet Journal - Noktalı A5',
    slug: 'bullet-journal-noktali-a5',
    description: `
      <p>5mm aralıklı noktalı sayfalara sahip profesyonel bullet journal.</p>
      <ul>
        <li>A5 boyut</li>
        <li>180 sayfa, 100gr kağıt</li>
        <li>PU deri kapak</li>
        <li>Sayfa numaralandırma</li>
        <li>İndeks sayfaları</li>
      </ul>
    `,
    shortDescription: 'Profesyonel noktalı bullet journal, PU deri kapak.',
    price: 159,
    compareAtPrice: 189,
    sku: 'APR-BLT-DOT-A5',
    category: 'Bullet Journal',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800'
    ],
    stock: 80,
    isActive: true,
    isFeatured: true,
    isNew: false,
    tags: ['bullet journal', 'noktalı', 'deri'],
    variants: [
      {
        name: 'Kapak Rengi',
        options: ['Siyah', 'Kahverengi', 'Bordo', 'Lacivert'],
        prices: [159, 159, 169, 159]
      }
    ]
  },
  {
    name: 'Bullet Journal - Çizgisiz B6',
    slug: 'bullet-journal-cizgisiz-b6',
    description: `
      <p>Tamamen çizgisiz sayfalarla sınırsız yaratıcılık. Kompakt B6 boyut.</p>
    `,
    shortDescription: 'Çizgisiz bullet journal, B6 kompakt boyut.',
    price: 119,
    sku: 'APR-BLT-BLK-B6',
    category: 'Bullet Journal',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
    ],
    stock: 55,
    isActive: true,
    isFeatured: false,
    isNew: false,
    tags: ['bullet journal', 'çizgisiz', 'kompakt']
  },
  // Kırtasiye
  {
    name: 'Premium Kalem Seti - 12li',
    slug: 'premium-kalem-seti-12li',
    description: `
      <p>Profesyonel yazım deneyimi sunan 12 parçalı premium kalem seti.</p>
      <ul>
        <li>6 adet jel kalem (0.5mm)</li>
        <li>4 adet fosforlu kalem</li>
        <li>2 adet brush pen</li>
        <li>Özel kutu ambalaj</li>
      </ul>
    `,
    shortDescription: '12 parçalık premium kalem seti, özel kutuda.',
    price: 129,
    compareAtPrice: 159,
    sku: 'APR-PEN-PRM-12',
    category: 'Kırtasiye',
    subcategory: 'Kalemler',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 120,
    isActive: true,
    isFeatured: true,
    isNew: false,
    tags: ['kalem', 'set', 'premium']
  },
  {
    name: 'Pastel Fosforlu Kalem Seti',
    slug: 'pastel-fosforlu-kalem-seti',
    description: `
      <p>6 farklı pastel renkte fosforlu kalem seti. Göz yormayan soft tonlar.</p>
    `,
    shortDescription: '6lı pastel renkli fosforlu kalem seti.',
    price: 59,
    sku: 'APR-HLT-PST-6',
    category: 'Kırtasiye',
    subcategory: 'Fosforlu Kalemler',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 200,
    isActive: true,
    isFeatured: false,
    isNew: true,
    tags: ['fosforlu', 'pastel', 'set']
  },
  // Sticker & Washi
  {
    name: 'Vintage Washi Tape Seti - 10lu',
    slug: 'vintage-washi-tape-seti-10lu',
    description: `
      <p>Vintage desenli 10 adet washi tape içeren set. Planlayıcınızı süsleyin.</p>
    `,
    shortDescription: '10 adet vintage desenli washi tape seti.',
    price: 79,
    compareAtPrice: 99,
    sku: 'APR-WSH-VNT-10',
    category: 'Sticker & Washi Tape',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 150,
    isActive: true,
    isFeatured: true,
    isNew: false,
    tags: ['washi', 'vintage', 'dekoratif']
  },
  {
    name: 'Planlayıcı Sticker Paketi - 500+ Adet',
    slug: 'planlayici-sticker-paketi-500',
    description: `
      <p>500'den fazla çıkartma içeren mega paket. Planlayıcı süsleme için ideal.</p>
      <ul>
        <li>Tarih etiketleri</li>
        <li>İkon çıkartmaları</li>
        <li>Dekoratif sticker'lar</li>
        <li>Motivasyon yazıları</li>
      </ul>
    `,
    shortDescription: '500+ adet çıkartma içeren mega paket.',
    price: 69,
    sku: 'APR-STK-MGA-500',
    category: 'Sticker & Washi Tape',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800'
    ],
    stock: 180,
    isActive: true,
    isFeatured: false,
    isNew: true,
    tags: ['sticker', 'çıkartma', 'dekoratif']
  },
  // Hediye Setleri
  {
    name: 'Başlangıç Seti - Planlayıcı + Kalem',
    slug: 'baslangic-seti-planlayici-kalem',
    description: `
      <p>Planlama dünyasına adım atanlar için ideal başlangıç seti.</p>
      <ul>
        <li>A5 Haftalık Planlayıcı</li>
        <li>4lü Jel Kalem Seti</li>
        <li>Sticker Paketi (50 adet)</li>
        <li>Özel hediye kutusu</li>
      </ul>
    `,
    shortDescription: 'Planlayıcı, kalem ve sticker içeren başlangıç seti.',
    price: 199,
    compareAtPrice: 249,
    sku: 'APR-SET-BAS-001',
    category: 'Hediye Setleri',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800'
    ],
    stock: 40,
    isActive: true,
    isFeatured: true,
    isNew: true,
    tags: ['set', 'hediye', 'başlangıç']
  },
  {
    name: 'Premium Hediye Seti',
    slug: 'premium-hediye-seti',
    description: `
      <p>Sevdiklerinize özel, lüks hediye seti. Özel günler için mükemmel.</p>
      <ul>
        <li>Premium Yıllık Planlayıcı</li>
        <li>12li Kalem Seti</li>
        <li>Washi Tape Seti</li>
        <li>Sticker Koleksiyonu</li>
        <li>Premium hediye kutusu</li>
      </ul>
    `,
    shortDescription: 'Lüks hediye kutusu içinde premium planlayıcı seti.',
    price: 399,
    compareAtPrice: 499,
    sku: 'APR-SET-PRM-001',
    category: 'Hediye Setleri',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'
    ],
    stock: 25,
    isActive: true,
    isFeatured: true,
    isNew: false,
    tags: ['set', 'hediye', 'premium', 'lüks']
  },
  // Defterler
  {
    name: 'A5 Noktalı Defter - Kraft',
    slug: 'a5-noktali-defter-kraft',
    description: `
      <p>Minimalist kraft kapaklı noktalı defter. Günlük notlar için ideal.</p>
    `,
    shortDescription: 'Kraft kapaklı A5 noktalı defter.',
    price: 49,
    sku: 'APR-NTB-DOT-KRF',
    category: 'Defterler',
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800'
    ],
    stock: 200,
    isActive: true,
    isFeatured: false,
    isNew: false,
    tags: ['defter', 'noktalı', 'kraft']
  },
  {
    name: 'A5 Çizgili Defter - Siyah',
    slug: 'a5-cizgili-defter-siyah',
    description: `
      <p>Klasik siyah kapaklı çizgili defter. Yazı yazmak için mükemmel.</p>
    `,
    shortDescription: 'Siyah kapaklı A5 çizgili defter.',
    price: 45,
    sku: 'APR-NTB-LIN-BLK',
    category: 'Defterler',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800'
    ],
    stock: 180,
    isActive: true,
    isFeatured: false,
    isNew: false,
    tags: ['defter', 'çizgili', 'siyah']
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/apeirona';
    
    console.log('🔄 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB bağlantısı başarılı!');

    // Kategorileri ekle
    console.log('\n📁 Kategoriler ekleniyor...');
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} kategori eklendi.`);

    // Ürünleri ekle
    console.log('\n📦 Ürünler ekleniyor...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ ${products.length} ürün eklendi.`);

    console.log('\n🎉 Seed işlemi tamamlandı!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

seed();

