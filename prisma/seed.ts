import { PrismaClient, PlannerOptionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ============ ADMIN USER ============
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@apeirona.com' },
    update: {},
    create: {
      email: 'admin@apeirona.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // ============ CATEGORIES ============
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'gunluk-planlayicilar' },
      update: {},
      create: {
        name: 'Günlük Planlayıcılar',
        slug: 'gunluk-planlayicilar',
        description: 'Günlük planlarınızı organize edin',
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'haftalik-planlayicilar' },
      update: {},
      create: {
        name: 'Haftalık Planlayıcılar',
        slug: 'haftalik-planlayicilar',
        description: 'Haftalık hedeflerinizi takip edin',
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bullet-defterler' },
      update: {},
      create: {
        name: 'Bullet Defterler',
        slug: 'bullet-defterler',
        description: 'Bullet journal severler için',
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sinava-hazirlik' },
      update: {},
      create: {
        name: 'Sınava Hazırlık Defteri',
        slug: 'sinava-hazirlik',
        description: 'Sınav hazırlık sürecinizi planlayın',
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'planlama-setleri' },
      update: {},
      create: {
        name: 'Planlama Setleri',
        slug: 'planlama-setleri',
        description: 'Komple planlama setleri',
        order: 5,
      },
    }),
  ]);
  console.log('✅ Categories created:', categories.length);

  // ============ PRODUCTS ============
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'gunluk-planlayici-minimal' },
      update: {},
      create: {
        name: 'Günlük Planlayıcı | Minimal Design',
        slug: 'gunluk-planlayici-minimal',
        description: 'Minimalist tasarımlı günlük planlayıcı. A5 boyutunda, 120 sayfa.',
        price: 89,
        stock: 50,
        images: ['/images/products/gunluk-minimal-1.jpg'],
        categoryId: categories[0].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'haftalik-planlayici-floral' },
      update: {},
      create: {
        name: 'Haftalık Planlayıcı | Floral',
        slug: 'haftalik-planlayici-floral',
        description: 'Çiçek desenli haftalık planlayıcı. A5 boyutunda, 52 haftalık.',
        price: 79,
        stock: 30,
        images: ['/images/products/haftalik-floral-1.jpg'],
        categoryId: categories[1].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'bullet-defter-noktali' },
      update: {},
      create: {
        name: 'Bullet Defter | Noktalı',
        slug: 'bullet-defter-noktali',
        description: 'Noktalı bullet journal. 160gsm ivory kağıt, 192 sayfa.',
        price: 119,
        stock: 40,
        images: ['/images/products/bullet-noktali-1.jpg'],
        categoryId: categories[2].id,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { slug: 'sinav-hazirlik-defteri-2024' },
      update: {},
      create: {
        name: 'Sınav Hazırlık Defteri | 2024',
        slug: 'sinav-hazirlik-defteri-2024',
        description: 'YKS, KPSS, DGS için özel tasarlanmış sınav hazırlık defteri.',
        price: 99,
        stock: 100,
        images: ['/images/products/sinav-hazirlik-1.jpg'],
        categoryId: categories[3].id,
        isFeatured: true,
      },
    }),
  ]);
  console.log('✅ Products created:', products.length);

  // ============ PLANNER OPTIONS ============
  // Notebook Types
  const notebookTypes = await Promise.all([
    prisma.plannerOption.upsert({
      where: { id: 'nt1' },
      update: {},
      create: {
        id: 'nt1',
        type: PlannerOptionType.NOTEBOOK_TYPE,
        name: 'A5 - Spiralli Sert Karton Kapak',
        description: '15x21cm (En çok satan ölçü) 400gr. Bristol+Mat Selefon',
        price: 0,
        order: 1,
      },
    }),
    prisma.plannerOption.upsert({
      where: { id: 'nt2' },
      update: {},
      create: {
        id: 'nt2',
        type: PlannerOptionType.NOTEBOOK_TYPE,
        name: 'A5 - Tutkallı',
        description: '15x21cm Tutkallı cilt',
        price: 0,
        order: 2,
      },
    }),
    prisma.plannerOption.upsert({
      where: { id: 'nt3' },
      update: {},
      create: {
        id: 'nt3',
        type: PlannerOptionType.NOTEBOOK_TYPE,
        name: 'A5 - Spiralli Plastik Kapak',
        description: '15x21cm Plastik kapak',
        price: -10,
        order: 3,
      },
    }),
    prisma.plannerOption.upsert({
      where: { id: 'nt4' },
      update: {},
      create: {
        id: 'nt4',
        type: PlannerOptionType.NOTEBOOK_TYPE,
        name: 'A6 - Spiralli Sert Karton Kapak',
        description: '14x10cm 400gr. Bristol + Mat Selefon',
        price: -20,
        order: 4,
      },
    }),
  ]);

  // Inner Designs for nt1 (A5 - Spiralli Sert Karton Kapak)
  const innerDesigns = await Promise.all([
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Günlük Planlayıcı Türkçe',
        price: 0,
        parentId: 'nt1',
        order: 1,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Noktalı (Bullet)',
        price: 0,
        parentId: 'nt1',
        order: 2,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Kareli',
        price: 0,
        parentId: 'nt1',
        order: 3,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Çizgisiz',
        price: 0,
        parentId: 'nt1',
        order: 4,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Haftalık Planlayıcı',
        price: 10,
        parentId: 'nt1',
        order: 5,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.INNER_DESIGN,
        name: 'Sınav Hazırlık Planlayıcı',
        price: 15,
        parentId: 'nt1',
        order: 6,
      },
    }),
  ]);
  console.log('✅ Planner options created');

  // Cover Models
  await Promise.all([
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.COVER_MODEL,
        name: 'Minimal Beyaz',
        description: 'Sade ve şık',
        price: 0,
        order: 1,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.COVER_MODEL,
        name: 'Kraft Kahverengi',
        description: 'Doğal görünüm',
        price: 0,
        order: 2,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.COVER_MODEL,
        name: 'Mermer Desen',
        description: 'Zarif mermer efekti',
        price: 20,
        order: 3,
      },
    }),
  ]);

  // Spiral Types
  await Promise.all([
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.SPIRAL_TYPE,
        name: 'Tel Spiral',
        description: 'Klasik metal spiral',
        price: 0,
        order: 1,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.SPIRAL_TYPE,
        name: 'Plastik Spiral',
        description: 'Dayanıklı plastik',
        price: 0,
        order: 2,
      },
    }),
  ]);

  // Spiral Colors
  await Promise.all([
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.SPIRAL_COLOR,
        name: 'Siyah',
        price: 0,
        order: 1,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.SPIRAL_COLOR,
        name: 'Beyaz',
        price: 0,
        order: 2,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.SPIRAL_COLOR,
        name: 'Altın',
        price: 15,
        order: 3,
      },
    }),
  ]);

  // Packaging
  await Promise.all([
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.PACKAGING,
        name: 'Standart Paket',
        description: 'Zarif ambalaj kağıdı',
        price: 0,
        order: 1,
      },
    }),
    prisma.plannerOption.create({
      data: {
        type: PlannerOptionType.PACKAGING,
        name: 'Hediye Kutusu',
        description: 'Özel hediye kutusu',
        price: 35,
        order: 2,
      },
    }),
  ]);

  // ============ SETTINGS ============
  await prisma.setting.upsert({
    where: { key: 'shipping' },
    update: {},
    create: {
      key: 'shipping',
      value: {
        freeShippingThreshold: 500,
        standardShippingCost: 29.90,
        expressShippingCost: 49.90,
      },
    },
  });

  await prisma.setting.upsert({
    where: { key: 'site' },
    update: {},
    create: {
      key: 'site',
      value: {
        name: 'Apeirona',
        tagline: 'Sınırsız Sanat',
        email: 'info@apeirona.com',
        phone: '+90 555 123 45 67',
        address: 'Kadıköy, İstanbul, Türkiye',
      },
    },
  });

  console.log('✅ Settings created');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

