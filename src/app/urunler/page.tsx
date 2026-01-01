'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, LayoutGrid, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

// Demo products - apeirona.com stilinde
const demoProducts = [
  {
    id: '1',
    name: 'Sınava Hazırlayan Defter | Başarı Takipçisi | Potter | 3',
    slug: 'sinava-hazirlayan-defter-potter-3',
    price: 189,
    discountPrice: 149,
    image: '/images/products/sinav-1.jpg',
    category: 'Sınava Hazırlık Defteri',
    isNew: true,
  },
  {
    id: '2',
    name: 'Mega Planlama Seti | 3 Farklı Özel Ürün | İkebana',
    slug: 'mega-planlama-seti-ikebana',
    price: 349,
    image: '/images/products/mega-ikebana.jpg',
    category: 'Planlama Setleri',
    isFeatured: true,
  },
  {
    id: '3',
    name: '4 Adet | Kraft Kapaklı | Çizgisiz Defter Seti',
    slug: 'kraft-cizgisiz-defter-seti',
    price: 159,
    image: '/images/products/kraft-set.jpg',
    category: 'Çizgisiz Defterler',
  },
  {
    id: '4',
    name: 'Kitap Okuma Defteri | Takip Et – Not Al – Kitaplığını Kur',
    slug: 'kitap-okuma-defteri',
    price: 129,
    image: '/images/products/kitap-okuma.jpg',
    category: 'Kitap Okuma Defteri',
  },
  {
    id: '5',
    name: 'Haftalık Planlayıcı | 52 Yaprak | Kızıl Güneş',
    slug: 'haftalik-planlayici-kizil-gunes',
    price: 99,
    discountPrice: 79,
    image: '/images/products/haftalik-1.jpg',
    category: 'Haftalık Planlayıcılar',
  },
  {
    id: '6',
    name: 'Noktalı Defter | Bullet Journal | Kızıl Mühür',
    slug: 'noktali-defter-kizil-muhur',
    price: 89,
    image: '/images/products/bullet-1.jpg',
    category: 'Bullet Defterler',
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
    name: 'Günlük Planlayıcı | 365 Gün | Botanik Serisi',
    slug: 'gunluk-planlayici-botanik',
    price: 149,
    image: '/images/products/gunluk-botanik.jpg',
    category: 'Günlük Planlayıcılar',
  },
  {
    id: '9',
    name: 'To-Do List Defteri | Minimal Design',
    slug: 'to-do-list-minimal',
    price: 59,
    image: '/images/products/todo-1.jpg',
    category: 'To-Do List Defterler',
  },
  {
    id: '10',
    name: 'Diyet Takip Defteri | Sağlıklı Yaşam',
    slug: 'diyet-takip-defteri',
    price: 79,
    image: '/images/products/diyet-1.jpg',
    category: 'Spor ve Diyet Defterleri',
  },
  {
    id: '11',
    name: '3\'lü Noktalı Defter Seti | İkebana Serisi',
    slug: '3lu-noktali-defter-seti-ikebana',
    price: 179,
    image: '/images/products/3lu-set.jpg',
    category: 'Noktalı Defter Setleri',
  },
  {
    id: '12',
    name: 'Masaüstü Planlayıcı | Haftalık | A4',
    slug: 'masaustu-planlayici-a4',
    price: 69,
    image: '/images/products/masaustu-1.jpg',
    category: 'Masaüstü Planlayıcılar',
  },
];

// Kategoriler - apeirona.com'dan
const categories = [
  { id: 'all', name: 'Tüm Kategoriler' },
  { id: '3lu-defter-setleri', name: "3'lü Defter Setleri" },
  { id: 'bullet-defterler', name: 'Bullet Defterler' },
  { id: 'cizgili-kareli-defterler', name: 'Çizgili Ve Kareli Defterler' },
  { id: 'cizgisiz-defterler', name: 'Çizgisiz Defterler' },
  { id: 'gunluk-planlayicilar', name: 'Günlük Planlayıcılar' },
  { id: 'haftalik-planlayicilar', name: 'Haftalık Planlayıcılar' },
  { id: 'kalem-kalemlik', name: 'Kalem-Kalemlik' },
  { id: 'kitap-okuma-defteri', name: 'Kitap Okuma Defteri' },
  { id: 'kraft-urunler', name: 'Kraft Ürünler' },
  { id: 'masaustu-planlayicilar', name: 'Masaüstü Planlayıcılar' },
  { id: 'noktali-defter-setleri', name: 'Noktalı Defter Setleri' },
  { id: 'planlama-setleri', name: 'Planlama Setleri' },
  { id: 'seyahat-planlayicilar', name: 'Seyahat Planlayıcılar' },
  { id: 'sinava-hazirlik', name: 'Sınava Hazırlık Defteri' },
  { id: 'spor-diyet', name: 'Spor ve Diyet Defterleri' },
  { id: 'to-do-list', name: 'To-Do List Defterler' },
];

const sortOptions = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'popular', label: 'En Popüler' },
  { value: 'name-asc', label: 'İsim: A-Z' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(demoProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    // In production, fetch from API
  }, [selectedCategory, sortBy]);

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name || 'Tüm Kategoriler';

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-[var(--color-cream)] py-8 sm:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-3">
              Sanatın Mağazası
            </h1>
            <p className="text-[var(--color-stone)] text-sm sm:text-base max-w-md mx-auto">
              El yapımı, özgün tasarımlarla hazırlanmış planlayıcılar ve defterler
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pb-12">
        {/* Toolbar - Mobile & Desktop */}
        <div className="sticky top-20 z-30 bg-[var(--color-cream)] py-4 -mx-4 px-4 lg:mx-0 lg:px-0 border-b border-[var(--color-sand)]">
          <div className="flex items-center justify-between gap-3">
            {/* Sol: Filtre ve Kategori */}
            <div className="flex items-center gap-2 flex-1">
              {/* Mobile Filtre Butonu */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filtreler</span>
              </button>

              {/* Kategori Dropdown - Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium min-w-[200px] justify-between"
                >
                  <span className="truncate">{selectedCategoryName}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setShowCategoryDropdown(false);
                          }}
                          className={`
                            w-full text-left px-4 py-2.5 text-sm transition-colors
                            ${selectedCategory === category.id
                              ? 'bg-[var(--color-primary)] text-white'
                              : 'hover:bg-[var(--color-beige)]'
                            }
                          `}
                        >
                          {category.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ürün Sayısı */}
              <p className="text-sm text-[var(--color-stone)] hidden sm:block">
                <span className="font-medium text-[var(--color-dark)]">{products.length}</span> ürün
              </p>
            </div>

            {/* Sağ: Sıralama */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-[var(--color-sand)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)] min-w-[140px] sm:min-w-[180px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="flex gap-8 mt-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[180px] space-y-6">
              {/* Kategoriler */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Kategoriler</h3>
                <div className="space-y-1 max-h-[400px] overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                        ${selectedCategory === category.id
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'hover:bg-[var(--color-beige)]'
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Daha Fazla Yükle
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-[var(--color-sand)] p-4 flex items-center justify-between z-10">
                <h2 className="font-serif text-xl font-semibold">Filtreler</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-[var(--color-beige)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {/* Kategoriler */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Kategoriler</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                        }}
                        className={`
                          w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors
                          ${selectedCategory === category.id
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'hover:bg-[var(--color-beige)]'
                          }
                        `}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="sticky bottom-0 bg-white border-t border-[var(--color-sand)] p-4">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => setShowFilters(false)}
                >
                  {products.length} Ürünü Göster
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kategori Dropdown Overlay */}
      {showCategoryDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowCategoryDropdown(false)}
        />
      )}
    </div>
  );
}
