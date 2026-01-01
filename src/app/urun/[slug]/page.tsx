'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/product/ProductCard';

// Demo ürün verisi
const demoProduct = {
  id: '1',
  name: 'Haftalık Planlayıcı | 52 Yaprak | Kızıl Güneş',
  slug: 'haftalik-planlayici-kizil-gunes',
  price: 129,
  discountPrice: 99,
  images: [
    '/images/products/planner-1.jpg',
    '/images/products/planner-2.jpg',
    '/images/products/planner-3.jpg',
    '/images/products/planner-4.jpg',
  ],
  category: 'Haftalık Planlayıcılar',
  categorySlug: 'haftalik-planlayicilar',
  series: 'Güneş Dağları Serisi',
  description: `
    <p>Haftalık Planlayıcı, 52 yaprak ile bir yıl boyunca haftalık planlamanızı yapmanızı sağlar. Kızıl Güneş tasarımı ile hem şık hem de fonksiyonel bir planlayıcıya sahip olabilirsiniz.</p>
    <p><strong>Özellikler:</strong></p>
    <ul>
      <li>52 yaprak (104 sayfa)</li>
      <li>A5 boyut (14.8 x 21 cm)</li>
      <li>100 gr ivory kağıt</li>
      <li>Spiralli cilt</li>
      <li>Kraft kapak</li>
    </ul>
  `,
  features: [
    '52 Yaprak',
    'A5 Boyut',
    '100gr Ivory Kağıt',
    'Spiralli Cilt',
  ],
  stock: 15,
  sku: 'HP-KG-001',
  rating: 4.8,
  reviewCount: 124,
  isNew: true,
};

// İlgili ürünler
const relatedProducts = [
  {
    id: '2',
    name: 'Günlük Planlayıcı | Botanik Serisi',
    slug: 'gunluk-planlayici-botanik',
    price: 119,
    image: '/images/products/planner-2.jpg',
    category: 'Günlük Planlayıcılar',
  },
  {
    id: '3',
    name: 'Bullet Journal | Noktalı Defter',
    slug: 'bullet-journal-noktali',
    price: 89,
    image: '/images/products/bullet-1.jpg',
    category: 'Bullet Defterler',
  },
  {
    id: '4',
    name: 'Mega Planlama Seti | İkebana',
    slug: 'mega-planlama-seti-ikebana',
    price: 349,
    discountPrice: 299,
    image: '/images/products/mega-set.jpg',
    category: 'Planlama Setleri',
  },
  {
    id: '5',
    name: 'To-Do List Defteri | Minimal',
    slug: 'to-do-list-minimal',
    price: 59,
    image: '/images/products/todo-1.jpg',
    category: 'To-Do Listler',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem, openCart } = useCartStore();

  const product = demoProduct; // In production, fetch by slug
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity,
      isCustom: false,
    });
    openCart();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[var(--color-cream)] py-4">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-[var(--color-stone)]">
            <Link href="/" className="hover:text-[var(--color-primary)]">Anasayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-[var(--color-primary)]">Ürünler</Link>
            <span>/</span>
            <Link href={`/urunler?kategori=${product.categorySlug}`} className="hover:text-[var(--color-primary)]">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[var(--color-charcoal)]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Ürün Detay */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Sol - Görseller */}
            <div className="space-y-4 lg:sticky lg:top-28">
              {/* Ana Görsel */}
              <div className="relative aspect-square lg:aspect-[4/5] bg-[var(--color-beige)] rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[currentImageIndex] || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <span className="badge badge-new">YENİ</span>
                  )}
                  {hasDiscount && (
                    <span className="badge badge-sale">%{discountPercentage}</span>
                  )}
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Görseller */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`
                        relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                        ${currentImageIndex === index 
                          ? 'border-[var(--color-primary)]' 
                          : 'border-transparent hover:border-[var(--color-sand)]'
                        }
                      `}
                    >
                      <Image
                        src={image || '/placeholder-product.jpg'}
                        alt={`${product.name} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sağ - Ürün Bilgileri */}
            <div className="lg:py-4">
              {/* Kategori ve Seri */}
              <div className="flex items-center gap-2 mb-2">
                <Link 
                  href={`/urunler?kategori=${product.categorySlug}`}
                  className="text-sm text-[var(--color-primary)] hover:underline"
                >
                  {product.category}
                </Link>
                {product.series && (
                  <>
                    <span className="text-[var(--color-stone)]">•</span>
                    <span className="text-sm text-[var(--color-stone)]">{product.series}</span>
                  </>
                )}
              </div>

              {/* Ürün Adı */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(product.rating)
                          ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                          : 'text-[var(--color-sand)]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--color-stone)]">
                  {product.rating} ({product.reviewCount} değerlendirme)
                </span>
              </div>

              {/* Fiyat */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className={`text-3xl font-bold ${hasDiscount ? 'text-[var(--color-error)]' : 'text-[var(--color-primary)]'}`}>
                  {(product.discountPrice || product.price).toFixed(2)}₺
                </span>
                {hasDiscount && (
                  <span className="text-xl text-[var(--color-stone)] line-through">
                    {product.price.toFixed(2)}₺
                  </span>
                )}
              </div>

              {/* Özellikler */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-[var(--color-beige)] rounded-full text-sm text-[var(--color-charcoal)]"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Stok Durumu */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-[var(--color-success)]" />
                    <span className="text-[var(--color-success)]">Stokta var</span>
                    <span className="text-[var(--color-stone)] text-sm">
                      ({product.stock} adet)
                    </span>
                  </>
                ) : (
                  <span className="text-[var(--color-error)]">Stokta yok</span>
                )}
              </div>

              {/* Miktar ve Sepete Ekle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Miktar */}
                <div className="flex items-center gap-3 bg-[var(--color-beige)] rounded-xl p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Sepete Ekle */}
                <Button
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  leftIcon={<ShoppingBag className="w-5 h-5" />}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Sepete Ekle
                </Button>

                {/* Favori */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-colors
                    ${isFavorite 
                      ? 'bg-[var(--color-error)] border-[var(--color-error)] text-white' 
                      : 'border-[var(--color-sand)] hover:border-[var(--color-primary)]'
                    }
                  `}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* Hızlı Bilgiler */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[var(--color-cream)] rounded-2xl mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ücretsiz Kargo</p>
                    <p className="text-xs text-[var(--color-stone)]">400₺ üzeri</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Güvenli Ödeme</p>
                    <p className="text-xs text-[var(--color-stone)]">iyzico ile</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kolay İade</p>
                    <p className="text-xs text-[var(--color-stone)]">14 gün içinde</p>
                  </div>
                </div>
              </div>

              {/* Paylaş */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-[var(--color-stone)]">Paylaş:</span>
                <button className="w-9 h-9 rounded-full bg-[var(--color-beige)] flex items-center justify-center hover:bg-[var(--color-sand)] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* SKU */}
              <p className="text-sm text-[var(--color-stone)] mt-4">
                SKU: {product.sku}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ürün Açıklaması */}
      <section className="py-12 bg-[var(--color-cream)]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-6">
            Ürün Açıklaması
          </h2>
          <div 
            className="prose prose-lg max-w-none text-[var(--color-charcoal)]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </section>

      {/* İlgili Ürünler */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-8">
            Bunlar da İlginizi Çekebilir
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

