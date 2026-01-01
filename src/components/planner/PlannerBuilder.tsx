'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ShoppingBag,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { usePlannerStore, PLANNER_STEPS } from '@/store/plannerStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { PlannerStep } from './PlannerStep';
import { PlannerPreview } from './PlannerPreview';

export const PlannerBuilder: React.FC = () => {
  const {
    currentStep,
    selections,
    nextStep,
    prevStep,
    setStep,
    resetPlanner,
    getTotalPrice,
    isComplete,
    canProceed,
  } = usePlannerStore();

  const { addItem, openCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const complete = isComplete();
  const isLastStep = currentStep === PLANNER_STEPS.length - 1;

  const handleAddToCart = () => {
    if (!complete) return;

    addItem({
      name: 'Özel Tasarım Planlayıcı',
      price: totalPrice,
      quantity: 1,
      isCustom: true,
      customPlanner: {
        notebookType: selections.notebookType,
        innerDesign: selections.innerDesign,
        coverModel: selections.coverModel,
        spiralType: selections.spiralType,
        spiralColor: selections.spiralColor,
        packaging: selections.packaging,
      },
    });
    openCart();
    resetPlanner();
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Hero Section - Kompakt */}
      <section className="relative py-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
              <h1 className="font-serif text-2xl md:text-3xl font-bold">
                Kendi Planlayıcını Yarat
              </h1>
              <Sparkles className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-[var(--color-sand)] shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          {/* Step Counter */}
          <p className="text-sm text-[var(--color-stone)] mb-4">
            Adım {currentStep + 1} / {PLANNER_STEPS.length}
          </p>

          {/* Step Indicators */}
          <div className="flex gap-2">
            {PLANNER_STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = selections[step.key as keyof typeof selections] !== null;

              return (
                <button
                  key={step.key}
                  onClick={() => setStep(index)}
                  disabled={index > currentStep && !canProceed()}
                  className={`
                    flex-1 h-2 rounded-full transition-all duration-300
                    ${isActive ? 'bg-[var(--color-accent)]' : ''}
                    ${isCompleted && !isActive ? 'bg-[var(--color-primary)]' : ''}
                    ${!isCompleted && !isActive ? 'bg-[var(--color-sand)]' : ''}
                  `}
                />
              );
            })}
          </div>

          {/* Step Labels (Desktop) - Daha fazla boşluk */}
          <div className="hidden lg:flex gap-2 mt-5">
            {PLANNER_STEPS.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = selections[step.key as keyof typeof selections] !== null;

              return (
                <button
                  key={step.key}
                  onClick={() => setStep(index)}
                  className={`
                    flex-1 text-xs font-medium transition-colors
                    ${isActive ? 'text-[var(--color-accent)]' : ''}
                    ${isCompleted && !isActive ? 'text-[var(--color-primary)]' : ''}
                    ${!isCompleted && !isActive ? 'text-[var(--color-stone)]' : ''}
                  `}
                >
                  <span className="flex items-center justify-center gap-1">
                    {isCompleted && <Check className="w-3 h-3" />}
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className={`grid gap-8 ${complete ? 'lg:grid-cols-3' : 'lg:grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Steps Content */}
          <div className={complete ? 'lg:col-span-2' : ''}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PlannerStep step={PLANNER_STEPS[currentStep]} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-sand)]">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0}
                leftIcon={<ChevronLeft className="w-5 h-5" />}
              >
                Önceki
              </Button>

              <Button
                variant="ghost"
                onClick={resetPlanner}
                leftIcon={<RotateCcw className="w-5 h-5" />}
              >
                Sıfırla
              </Button>

              {currentStep < PLANNER_STEPS.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  rightIcon={<ChevronRight className="w-5 h-5" />}
                >
                  Sonraki
                </Button>
              ) : (
                <Button
                  variant="accent"
                  onClick={handleAddToCart}
                  disabled={!complete}
                  rightIcon={<ShoppingBag className="w-5 h-5" />}
                  size="lg"
                >
                  Sepete Ekle - {totalPrice.toFixed(2)}₺
                </Button>
              )}
            </div>
          </div>

          {/* Preview Sidebar - Sadece tamamlandığında görünür */}
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-[200px]">
                  <PlannerPreview />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PlannerBuilder;
