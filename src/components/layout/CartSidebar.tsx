'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { siteConfig, calculateShipping } from '@/lib/siteConfig';

export const CartSidebar: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const shipping = calculateShipping(totalPrice);
  const { freeShippingThreshold, standardShippingCost } = siteConfig.shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-sand)]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-semibold">Sepetim</h2>
                <span className="px-2 py-1 bg-[var(--color-beige)] rounded-full text-sm font-medium">
                  {items.length} ürün
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-[var(--color-beige)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {!shipping.isFree && items.length > 0 && (
              <div className="px-6 py-4 bg-[var(--color-beige)]">
                <p className="text-sm text-[var(--color-charcoal)] mb-2">
                  <span className="font-semibold">{shipping.remaining.toFixed(2)}₺</span> daha ekleyin, 
                  <span className="text-[var(--color-accent)] font-semibold"> ücretsiz kargo</span> kazanın!
                </p>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalPrice / freeShippingThreshold) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-[var(--color-beige)] rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-[var(--color-stone)]" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Sepetiniz Boş</h3>
                  <p className="text-[var(--color-stone)] mb-6">
                    Henüz sepetinize ürün eklemediniz.
                  </p>
                  <Button onClick={closeCart} variant="primary">
                    Alışverişe Başla
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-[var(--color-cream)] rounded-xl"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[var(--color-beige)]">
                            <ShoppingBag className="w-8 h-8 text-[var(--color-stone)]" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[var(--color-dark)] truncate">
                          {item.name}
                        </h4>
                        {item.isCustom && (
                          <span className="inline-block px-2 py-0.5 bg-[var(--color-accent)] text-white text-xs rounded-full mt-1">
                            Özel Tasarım
                          </span>
                        )}
                        <p className="text-[var(--color-primary)] font-semibold mt-1">
                          {item.price.toFixed(2)}₺
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[var(--color-beige)] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-[var(--color-beige)] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-[var(--color-error)] hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--color-sand)] p-6 space-y-4">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[var(--color-stone)]">
                    <span>Ara Toplam</span>
                    <span>{totalPrice.toFixed(2)}₺</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-stone)]">
                    <span>Kargo</span>
                    <span className={shipping.isFree ? 'text-[var(--color-success)]' : ''}>
                      {shipping.isFree ? 'Ücretsiz' : `${standardShippingCost.toFixed(2)}₺`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-[var(--color-sand)]">
                    <span>Toplam</span>
                    <span className="text-[var(--color-primary)]">
                      {(totalPrice + shipping.cost).toFixed(2)}₺
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link href="/odeme" onClick={closeCart} className="block">
                    <Button variant="primary" fullWidth rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Ödemeye Geç
                    </Button>
                  </Link>
                  <Button variant="outline" fullWidth onClick={closeCart}>
                    Alışverişe Devam Et
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

