'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Shield,
  Check,
  MapPin,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/store/cartStore';

const steps = [
  { id: 1, label: 'Adres', icon: MapPin },
  { id: 2, label: 'Kargo', icon: Truck },
  { id: 3, label: 'Ödeme', icon: CreditCard },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { items, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice >= 500 ? 0 : 29.90;

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    addressLine: '',
    postalCode: '',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-sand)]">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/urunler" className="flex items-center gap-2 text-[var(--color-stone)] hover:text-[var(--color-dark)]">
              <ChevronLeft className="w-5 h-5" />
              <span>Alışverişe Devam</span>
            </Link>
            <span className="font-serif text-2xl font-bold">Apeirona</span>
            <div className="flex items-center gap-2 text-sm text-[var(--color-stone)]">
              <Shield className="w-5 h-5" />
              <span>Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-[var(--color-sand)]">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= step.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-stone)]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step.id
                        ? 'bg-[var(--color-primary)] text-white'
                        : currentStep === step.id
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-sand)]'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${currentStep > step.id ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-sand)]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)]"
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Teslimat Adresi</h2>
                
                <div className="grid gap-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Ad Soyad"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      placeholder="Adınız Soyadınız"
                      required
                    />
                    <Input
                      label="Telefon"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      placeholder="0555 123 45 67"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="İl"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="İstanbul"
                      required
                    />
                    <Input
                      label="İlçe"
                      value={shippingAddress.district}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                      placeholder="Kadıköy"
                      required
                    />
                  </div>

                  <Input
                    label="Mahalle"
                    value={shippingAddress.neighborhood}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, neighborhood: e.target.value })}
                    placeholder="Caferağa Mahallesi"
                    required
                  />

                  <Input
                    label="Adres"
                    value={shippingAddress.addressLine}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine: e.target.value })}
                    placeholder="Sokak, Bina No, Daire No"
                    required
                  />

                  <Input
                    label="Posta Kodu (Opsiyonel)"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    placeholder="34710"
                  />
                </div>

                <div className="mt-8">
                  <Button variant="primary" size="lg" fullWidth onClick={() => setCurrentStep(2)}>
                    Kargo Seçimine Geç
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)]"
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Kargo Seçenekleri</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'standard', label: 'Standart Kargo', price: 29.90, days: '3-5 iş günü' },
                    { id: 'express', label: 'Hızlı Kargo', price: 49.90, days: '1-2 iş günü' },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        shippingMethod === option.id
                          ? 'border-[var(--color-primary)] bg-[var(--color-cream)]'
                          : 'border-[var(--color-sand)] hover:border-[var(--color-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={shippingMethod === option.id}
                          onChange={() => setShippingMethod(option.id)}
                          className="w-5 h-5 text-[var(--color-primary)]"
                        />
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-[var(--color-stone)]">{option.days}</p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        {totalPrice >= 500 && option.id === 'standard' ? (
                          <span className="text-[var(--color-success)]">Ücretsiz</span>
                        ) : (
                          `${option.price}₺`
                        )}
                      </p>
                    </label>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="ghost" size="lg" onClick={() => setCurrentStep(1)}>
                    Geri
                  </Button>
                  <Button variant="primary" size="lg" fullWidth onClick={() => setCurrentStep(3)}>
                    Ödeme Bilgilerine Geç
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-[var(--shadow-soft)]"
              >
                <h2 className="font-serif text-2xl font-bold mb-6">Ödeme Bilgileri</h2>
                
                <div className="p-6 bg-[var(--color-beige)] rounded-xl mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-[var(--color-primary)]" />
                    <span className="font-medium">iyzico ile Güvenli Ödeme</span>
                  </div>
                  <p className="text-sm text-[var(--color-stone)]">
                    Ödeme işlemi iyzico altyapısı üzerinden güvenle gerçekleştirilecektir.
                    Kart bilgileriniz bizimle paylaşılmaz.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Input
                    label="Kart Üzerindeki İsim"
                    placeholder="AYŞE YILMAZ"
                  />
                  <Input
                    label="Kart Numarası"
                    placeholder="4242 4242 4242 4242"
                    leftIcon={<CreditCard className="w-5 h-5" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Son Kullanma"
                      placeholder="MM/YY"
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="ghost" size="lg" onClick={() => setCurrentStep(2)}>
                    Geri
                  </Button>
                  <Button variant="accent" size="lg" fullWidth>
                    {(totalPrice + shippingCost).toFixed(2)}₺ Öde
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)] sticky top-[140px]">
              <h3 className="font-serif text-xl font-semibold mb-6">Sipariş Özeti</h3>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[var(--color-beige)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-[var(--color-stone)]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">{item.name}</p>
                      <p className="text-sm text-[var(--color-stone)]">Adet: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{(item.price * item.quantity).toFixed(2)}₺</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-sand)] pt-4 space-y-3">
                <div className="flex justify-between text-[var(--color-stone)]">
                  <span>Ara Toplam</span>
                  <span>{totalPrice.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between text-[var(--color-stone)]">
                  <span>Kargo</span>
                  <span className={shippingCost === 0 ? 'text-[var(--color-success)]' : ''}>
                    {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost}₺`}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-[var(--color-sand)]">
                  <span>Toplam</span>
                  <span className="text-[var(--color-primary)]">
                    {(totalPrice + shippingCost).toFixed(2)}₺
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

