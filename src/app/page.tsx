'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Shield, 
  Gift, 
  Star,
  BookOpen,
  Calendar,
  Target,
  ClipboardList,
  UtensilsCrossed,
  Plane,
  Pencil,
  Book,
  Package,
  CheckSquare,
  Layers,
  Grid
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';

// Demo Products - Apeirona.com stilinde
const featuredProducts = [
  {
    id: '1',
    name: 'Sınava Hazırlayan Defter | Başarı Takipçisi | Potter',
    slug: 'sinava-hazirlayan-defter-potter',
    price: 189,
    discountPrice: 149,
    image: '/images/products/sinav-defter.jpg',
    category: 'Sınava Hazırlık Defteri',
    isNew: true,
  },
  {
    id: '2',
    name: 'Mega Planlama Seti | 3 Farklı Özel Ürün | İkebana',
    slug: 'mega-planlama-seti-ikebana',
    price: 349,
    image: '/images/products/mega-set.jpg',
    category: 'Planlama Setleri',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Kitap Okuma Defteri | Reading Planner',
    slug: 'kitap-okuma-defteri',
    price: 129,
    image: '/images/products/kitap-okuma.jpg',
    category: 'Kitap Okuma Defteri',
  },
  {
    id: '4',
    name: 'Haftalık Planlayıcı | 52 Yaprak | Kızıl Güneş',
    slug: 'haftalik-planlayici-kizil-gunes',
    price: 99,
    discountPrice: 79,
    image: '/images/products/haftalik.jpg',
    category: 'Haftalık Planlayıcılar',
  },
  {
    id: '5',
    name: 'Noktalı Defter | Bullet Journal | Kızıl Mühür',
    slug: 'noktali-defter-kizil-muhur',
    price: 89,
    image: '/images/products/bullet.jpg',
    category: 'Bullet Defterler',
  },
  {
    id: '6',
    name: '4 Adet | Kraft Kapaklı | Çizgisiz Defter Seti',
    slug: 'kraft-cizgisiz-defter-seti',
    price: 159,
    image: '/images/products/kraft-set.jpg',
    category: 'Çizgisiz Defterler',
    isNew: true,
  },
  {
    id: '7',
    name: 'Mega Planlama Seti | 3 Farklı Özel Ürün | Güneş Dağları',
    slug: 'mega-planlama-seti-gunes-daglari',
    price: 349,
    discountPrice: 299,
    image: '/images/products/mega-gunes.jpg',
    category: 'Planlama Setleri',
  },
  {
    id: '8',
    name: 'Günlük Planlayıcı | Botanik Serisi',
    slug: 'gunluk-planlayici-botanik',
    price: 119,
    image: '/images/products/gunluk-botanik.jpg',
    category: 'Günlük Planlayıcılar',
  },
];

// Apeirona.com kategorileri - Ana kategoriler
const mainCategories = [
  {
    name: 'Günlük Planlayıcılar',
    slug: 'gunluk-planlayicilar',
    icon: Calendar,
    color: 'from-amber-100 to-amber-50',
    count: 18,
  },
  {
    name: 'Haftalık Planlayıcılar',
    slug: 'haftalik-planlayicilar',
    icon: BookOpen,
    color: 'from-lime-100 to-lime-50',
    count: 24,
  },
  {
    name: 'Bullet Defterler',
    slug: 'bullet-defterler',
    icon: Target,
    color: 'from-rose-100 to-rose-50',
    count: 16,
  },
  {
    name: 'Sınava Hazırlık',
    slug: 'sinava-hazirlik',
    icon: CheckSquare,
    color: 'from-sky-100 to-sky-50',
    count: 12,
  },
  {
    name: 'To-Do Listler',
    slug: 'to-do-listler',
    icon: ClipboardList,
    color: 'from-violet-100 to-violet-50',
    count: 8,
  },
  {
    name: 'Diyet Planlayıcılar',
    slug: 'diyet-planlayicilar',
    icon: UtensilsCrossed,
    color: 'from-emerald-100 to-emerald-50',
    count: 6,
  },
];

// Özel Seriler - Apeirona.com stilinde
const specialSeries = [
  {
    name: 'Güneş Dağları Serisi',
    slug: 'gunes-daglari-serisi',
    image: '/images/series/gunes-daglari.jpg',
    description: 'Sıcak tonlar ve dağ motifleri',
  },
  {
    name: 'İkebana Serisi',
    slug: 'ikebana-serisi',
    image: '/images/series/ikebana.jpg',
    description: 'Japon çiçek sanatından ilham',
  },
  {
    name: 'Hakugawa Serisi',
    slug: 'hakugawa-serisi',
    image: '/images/series/hakugawa.jpg',
    description: 'Minimal Japon estetiği',
  },
  {
    name: 'Botanik Serisi',
    slug: 'botanik-serisi',
    image: '/images/series/botanik.jpg',
    description: 'Doğanın zarif detayları',
  },
  {
    name: 'Muzur Kediler Serisi',
    slug: 'muzur-kediler-serisi',
    image: '/images/series/kediler.jpg',
    description: 'Sevimli kedi karakterleri',
  },
  {
    name: 'Potter Serisi',
    slug: 'potter-serisi',
    image: '/images/series/potter.jpg',
    description: 'Sihirli dünya teması',
  },
];

// Tüm kategoriler grid için
const allCategories = [
  { name: '3\'lü Defter Setleri', slug: '3lu-defter-setleri', icon: Layers },
  { name: 'Bullet Defterler', slug: 'bullet-defterler', icon: Target },
  { name: 'Çizgili Ve Kareli Defterler', slug: 'cizgili-kareli-defterler', icon: Grid },
  { name: 'Çizgisiz Defterler', slug: 'cizgisiz-defterler', icon: BookOpen },
  { name: 'Günlük Planlayıcılar', slug: 'gunluk-planlayicilar', icon: Calendar },
  { name: 'Haftalık Planlayıcılar', slug: 'haftalik-planlayicilar', icon: BookOpen },
  { name: 'Kalem-Kalemlik', slug: 'kalem-kalemlik', icon: Pencil },
  { name: 'Kitap Okuma Defteri', slug: 'kitap-okuma-defteri', icon: Book },
  { name: 'Kraft Ürünler', slug: 'kraft-urunler', icon: Package },
  { name: 'Masaüstü Planlayıcılar', slug: 'masaustu-planlayicilar', icon: Calendar },
  { name: 'Noktalı Defter Setleri', slug: 'noktali-defter-setleri', icon: Target },
  { name: 'Planlama Setleri', slug: 'planlama-setleri', icon: Package },
  { name: 'Seyahat Planlayıcılar', slug: 'seyahat-planlayicilar', icon: Plane },
  { name: 'Sınava Hazırlık Defteri', slug: 'sinava-hazirlik', icon: CheckSquare },
  { name: 'Spor ve Diyet Defterleri', slug: 'spor-diyet-defterleri', icon: UtensilsCrossed },
  { name: 'To-Do List Defterler', slug: 'to-do-list-defterler', icon: ClipboardList },
];

const features = [
  {
    icon: Truck,
    title: '400₺ Üzeri Ücretsiz Kargo',
    description: 'Tüm Türkiye\'ye',
  },
  {
    icon: Shield,
    title: 'Güvenli Ödeme',
    description: 'iyzico güvencesiyle',
  },
  {
    icon: Gift,
    title: 'Özel Paketleme',
    description: 'Hediye seçenekleri',
  },
  {
    icon: Star,
    title: 'Kalite Garantisi',
    description: '%100 memnuniyet',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Üst Banner - apeirona.com stilinde */}
      <div className="bg-[var(--color-dark)] text-white text-center py-2.5 text-sm font-medium tracking-wide">
        <span>400 TL ÜZERİ ÜCRETSİZ KARGO</span>
      </div>

      {/* Hero Section - Kategori Kartları Stilinde */}
      <section className="relative bg-gradient-to-b from-[var(--color-cream)] to-white">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Ana Kategori Kartları - apeirona.com stilinde */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mainCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/urunler?kategori=${category.slug}`}>
                  <div className={`relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br ${category.color} group cursor-pointer transition-all duration-300 hover:shadow-xl`}>
                    {/* Arka plan deseni */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute right-0 bottom-0 w-48 h-48">
                        <category.icon className="w-full h-full text-[var(--color-dark)]" />
                      </div>
                    </div>
                    
                    {/* İçerik */}
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[var(--color-primary)] group-hover:gap-4 transition-all">
                        <span className="font-medium">Hepsini Gör</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Placeholder görsel alanı */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-36 h-52 bg-white/50 rounded-xl shadow-lg transform rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-y border-[var(--color-sand)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[var(--color-beige)] rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--color-dark)]">{feature.title}</p>
                  <p className="text-sm text-[var(--color-stone)]">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Özel Seriler - apeirona.com stilinde */}
      <section className="section bg-[var(--color-cream)]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-[var(--color-dark)] mb-4">
              Özel Seriler
            </h2>
            <p className="text-[var(--color-stone)] max-w-xl mx-auto">
              El yapımı, özgün tasarımlarla hazırlanmış koleksiyonlarımızı keşfedin
            </p>
            <div className="divider mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {specialSeries.map((series, index) => (
              <motion.div
                key={series.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/seriler/${series.slug}`} className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-beige)] to-[var(--color-sand)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">📓</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-xl font-semibold text-white mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                        {series.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/70">
                        <span>Serinin Tamamını Gör</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Planner CTA - Kendi Planlayıcını Yarat */}
      <section className="section bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6"
              >
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="text-sm font-medium">Özel Tasarım</span>
              </motion.div>

              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Kendi Planlayıcını{' '}
                <span className="text-[var(--color-accent)]">Yarat</span>
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                6 kolay adımda hayalinizdeki planlayıcıyı tasarlayın. 
                Defter tipi, iç tasarım, kapak modeli, spiral ve paketleme 
                seçeneklerini dilediğiniz gibi özelleştirin.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { step: '1', title: 'Defter Tipi' },
                  { step: '2', title: 'İç Tasarım' },
                  { step: '3', title: 'Kapak Modeli' },
                  { step: '4', title: 'Spiral Tipi' },
                  { step: '5', title: 'Spiral Rengi' },
                  { step: '6', title: 'Paketleme' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
              </div>

              <Link href="/planlayici-olustur">
                <Button 
                  variant="accent" 
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Hemen Başla
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-9xl mb-4"
                  >
                    📓
                  </motion.div>
                  <p className="text-2xl font-serif">Başlangıç fiyatı</p>
                  <p className="text-5xl font-bold text-[var(--color-accent)]">89₺</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popüler Ürünler */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <div>
              <h2 className="font-serif text-4xl font-bold text-[var(--color-dark)] mb-4">
                Popüler Ürünler
              </h2>
              <div className="divider" />
            </div>
            <Link href="/urunler" className="mt-4 md:mt-0">
              <Button variant="ghost" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Tümünü Gör
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Tüm Kategoriler Grid */}
      <section className="section bg-[var(--color-beige)]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold text-[var(--color-dark)] mb-4">
              Tüm Kategoriler
            </h2>
            <div className="divider mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href={`/urunler?kategori=${category.slug}`} className="group block">
                  <div className="bg-white rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-all hover:bg-[var(--color-primary)] hover:text-white">
                    <category.icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                    <span className="font-medium text-sm group-hover:text-white transition-colors">{category.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 pattern-dots opacity-10" />
            <div className="relative">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                %10 İndirim Kazan!
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
                Bültenimize abone olun, ilk siparişinizde %10 indirim kazanın.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white"
                />
                <Button variant="primary" size="lg">
                  Abone Ol
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
