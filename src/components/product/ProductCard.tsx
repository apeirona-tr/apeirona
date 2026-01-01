'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  price,
  discountPrice,
  image,
  category,
  isNew,
  isFeatured,
}) => {
  const { addItem, openCart } = useCartStore();
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      price: discountPrice || price,
      image,
      quantity: 1,
      isCustom: false,
    });
    openCart();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement favorite functionality
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement quick view modal
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/urun/${slug}`} className="block">
        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-beige)]">
            <Image
              src={image || '/placeholder-product.jpg'}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Badges - Sol üst */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5">
              {isNew && (
                <span className="px-2 py-1 bg-[var(--color-accent)] text-white text-[10px] sm:text-xs font-semibold rounded uppercase tracking-wide">
                  Yeni
                </span>
              )}
              {hasDiscount && (
                <span className="px-2 py-1 bg-[var(--color-error)] text-white text-[10px] sm:text-xs font-semibold rounded">
                  %{discountPercentage}
                </span>
              )}
              {isFeatured && !isNew && !hasDiscount && (
                <span className="px-2 py-1 bg-[var(--color-primary)] text-white text-[10px] sm:text-xs font-semibold rounded uppercase tracking-wide">
                  Öne Çıkan
                </span>
              )}
            </div>

            {/* Quick Actions - Sağ üst (Desktop only) */}
            <div className="absolute top-3 right-3 flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:flex">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                aria-label="Favorilere Ekle"
              >
                <Heart className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickView}
                className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                aria-label="Hızlı Görüntüle"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Add to Cart Button - Desktop */}
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-0 left-0 right-0 py-3 bg-[var(--color-primary)] text-white text-sm font-medium flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex"
            >
              <ShoppingBag className="w-4 h-4" />
              Sepete Ekle
            </motion.button>

            {/* Mobile Add to Cart Button - Sağ alt köşe */}
            <button
              onClick={handleAddToCart}
              className="absolute bottom-2 right-2 w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-lg sm:hidden active:scale-95 transition-transform"
              aria-label="Sepete Ekle"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4">
            {category && (
              <p className="text-[10px] sm:text-xs text-[var(--color-stone)] mb-1 truncate">{category}</p>
            )}
            <h3 className="font-medium text-sm sm:text-base text-[var(--color-dark)] mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:text-[var(--color-primary)] transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-base sm:text-lg ${hasDiscount ? 'text-[var(--color-error)]' : 'text-[var(--color-primary)]'}`}>
                {(discountPrice || price).toFixed(0)}₺
              </span>
              {hasDiscount && (
                <span className="text-[var(--color-stone)] line-through text-xs sm:text-sm">
                  {price.toFixed(0)}₺
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
