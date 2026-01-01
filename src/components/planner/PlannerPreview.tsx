'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { usePlannerStore, PLANNER_STEPS } from '@/store/plannerStore';

export const PlannerPreview: React.FC = () => {
  const { selections, getTotalPrice, isComplete } = usePlannerStore();
  const totalPrice = getTotalPrice();
  const basePrice = 89;

  const selectionItems = [
    { key: 'notebookType', label: 'Defter Tipi', icon: '📒' },
    { key: 'innerDesign', label: 'İç Tasarım', icon: '📝' },
    { key: 'coverModel', label: 'Kapak Modeli', icon: '🎨' },
    { key: 'spiralType', label: 'Spiral Tipi', icon: '🔗' },
    { key: 'spiralColor', label: 'Spiral Rengi', icon: '🌈' },
    { key: 'packaging', label: 'Kutulama', icon: '🎁' },
  ] as const;

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white p-6">
        <h3 className="font-serif text-xl font-semibold mb-2">Tasarımınız</h3>
        <p className="text-white/70 text-sm">Seçimlerinizi burada görebilirsiniz</p>
      </div>

      {/* Preview Image */}
      <div className="p-6 border-b border-[var(--color-sand)]">
        <div className="aspect-square bg-[var(--color-beige)] rounded-xl flex items-center justify-center">
          <motion.div
            animate={{
              rotateY: isComplete() ? [0, 360] : 0,
            }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-8xl"
          >
            📓
          </motion.div>
        </div>
      </div>

      {/* Selections List */}
      <div className="p-6 space-y-4">
        {selectionItems.map((item) => {
          const selection = selections[item.key as keyof typeof selections];
          const isSelected = selection !== null;

          return (
            <motion.div
              key={item.key}
              layout
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm text-[var(--color-stone)]">{item.label}</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selection?.name || 'empty'}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className={`font-medium ${isSelected ? 'text-[var(--color-dark)]' : 'text-[var(--color-stone)]'}`}
                    >
                      {selection?.name || 'Seçilmedi'}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {selection?.price !== undefined && selection.price !== 0 && (
                  <span className={`text-sm font-medium ${selection.price > 0 ? 'text-[var(--color-accent)]' : 'text-[var(--color-success)]'}`}>
                    {selection.price > 0 ? `+${selection.price}₺` : `${selection.price}₺`}
                  </span>
                )}
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${isSelected ? 'bg-[var(--color-success)] text-white' : 'bg-[var(--color-sand)]'}
                `}>
                  {isSelected ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4 text-[var(--color-stone)]" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Price Summary */}
      <div className="p-6 bg-[var(--color-beige)]">
        <div className="flex justify-between text-sm text-[var(--color-stone)] mb-2">
          <span>Baz Fiyat</span>
          <span>{basePrice}₺</span>
        </div>
        <div className="flex justify-between text-sm text-[var(--color-stone)] mb-3">
          <span>Ek Seçenekler</span>
          <span>{totalPrice > 0 ? `+${totalPrice}₺` : '0₺'}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-3 border-t border-[var(--color-sand)]">
          <span>Toplam</span>
          <span className="text-[var(--color-primary)]">{(basePrice + totalPrice).toFixed(2)}₺</span>
        </div>
      </div>
    </div>
  );
};

export default PlannerPreview;

