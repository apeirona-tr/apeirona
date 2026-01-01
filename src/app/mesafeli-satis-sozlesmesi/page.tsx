'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Building2, User, ShoppingBag, Truck, CreditCard, RefreshCw } from 'lucide-react';

export default function DistanceSellingAgreementPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--color-dark)] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--color-accent)]" />
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Mesafeli Satış Sözleşmesi
            </h1>
            <p className="text-white/80">
              Son güncelleme: 1 Ocak 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Madde 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 1 - SATICI BİLGİLERİ
                </h2>
              </div>
              <div className="text-[var(--color-stone)] space-y-2">
                <p><strong>Ünvan:</strong> Apeirona Kırtasiye ve Planlayıcı San. Tic. Ltd. Şti.</p>
                <p><strong>Adres:</strong> Kadıköy, İstanbul, Türkiye</p>
                <p><strong>Telefon:</strong> +90 555 123 45 67</p>
                <p><strong>E-posta:</strong> info@apeirona.com</p>
                <p><strong>MERSİS No:</strong> 0123456789012345</p>
              </div>
            </motion.div>

            {/* Madde 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 2 - ALICI BİLGİLERİ
                </h2>
              </div>
              <p className="text-[var(--color-stone)]">
                Alıcı, sipariş sırasında verilen ad, soyad, adres, e-posta ve telefon 
                bilgilerinin doğruluğunu kabul ve beyan eder. Bu bilgilerin eksik veya 
                hatalı olmasından kaynaklanan sorumluluk alıcıya aittir.
              </p>
            </motion.div>

            {/* Madde 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 3 - SÖZLEŞME KONUSU
                </h2>
              </div>
              <div className="text-[var(--color-stone)]">
                <p className="mb-4">
                  İşbu sözleşmenin konusu, ALICI&apos;nın SATICI&apos;ya ait www.apeirona.com 
                  internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri 
                  ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 
                  6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere 
                  Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin 
                  belirlenmesidir.
                </p>
                <p>
                  Sipariş edilen ürün/ürünlerin cinsi, miktarı, rengi, fiyatı ve varsa kargo 
                  ücreti sipariş onay e-postasında ve hesabınızda görüntülenebilir.
                </p>
              </div>
            </motion.div>

            {/* Madde 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 4 - ÖDEME ŞEKLİ
                </h2>
              </div>
              <div className="text-[var(--color-stone)]">
                <p className="mb-4">Sitemizde aşağıdaki ödeme yöntemleri kabul edilmektedir:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kredi kartı / Banka kartı</li>
                  <li>Havale / EFT</li>
                  <li>Kapıda ödeme (nakit veya kredi kartı)</li>
                </ul>
                <p className="mt-4">
                  Kredi kartı ile yapılan ödemelerde taksit seçenekleri anlaşmalı banka 
                  kartlarına göre değişiklik gösterebilir. Taksit seçenekleri ödeme sayfasında 
                  görüntülenir.
                </p>
              </div>
            </motion.div>

            {/* Madde 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 5 - TESLİMAT
                </h2>
              </div>
              <div className="text-[var(--color-stone)]">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ürünler, sipariş onayından itibaren en geç 30 gün içinde teslim edilir.</li>
                  <li>Hazır ürünler 1-3 iş günü, özel üretim ürünler 5-7 iş günü içinde kargoya verilir.</li>
                  <li>Teslimat, ALICI&apos;nın sipariş formunda belirttiği adrese yapılır.</li>
                  <li>150₺ ve üzeri siparişlerde kargo ücretsizdir.</li>
                  <li>150₺ altı siparişlerde kargo ücreti 29,90₺&apos;dir.</li>
                  <li>ALICI, teslim anında ürünü kontrol etmeli, hasar varsa tutanak tutturmalıdır.</li>
                </ul>
              </div>
            </motion.div>

            {/* Madde 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-[var(--color-primary)]" />
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)]">
                  MADDE 6 - CAYMA HAKKI
                </h2>
              </div>
              <div className="text-[var(--color-stone)]">
                <p className="mb-4">
                  ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa 
                  tesliminden itibaren 14 (ondört) gün içinde cayma hakkını kullanabilir.
                </p>
                <p className="mb-4">
                  Cayma hakkının kullanılması için bu süre içinde SATICI&apos;ya yazılı bildirimde 
                  bulunulması ve ürünün kullanılmamış, orijinal ambalajında iade edilmesi 
                  gerekmektedir.
                </p>
                <p className="font-semibold text-[var(--color-dark)]">
                  Cayma hakkı kullanılamayacak ürünler:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Tüketicinin istekleri veya açıkça kişisel ihtiyaçları doğrultusunda 
                  hazırlanan ürünler (&quot;Kendi Planlayıcını Yarat&quot; ürünleri)</li>
                  <li>Çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler</li>
                  <li>Tesliminden sonra ambalajı açılmış hijyen ürünleri</li>
                </ul>
              </div>
            </motion.div>

            {/* Madde 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm p-8"
            >
              <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                MADDE 7 - GENEL HÜKÜMLER
              </h2>
              <div className="text-[var(--color-stone)] space-y-4">
                <p>
                  1. ALICI, işbu sözleşme hükümlerini, ürün özelliklerini ve satış fiyatını 
                  kabul ettiğini beyan eder.
                </p>
                <p>
                  2. SATICI, siparişi teslim etmesini imkânsız kılan bir durum oluşursa, 
                  bu durumu öğrendiği tarihten itibaren 3 gün içinde alıcıya bildirmekle 
                  yükümlüdür.
                </p>
                <p>
                  3. İşbu sözleşmeden kaynaklanan uyuşmazlıklarda Tüketici Hakem Heyetleri 
                  ve Tüketici Mahkemeleri yetkilidir.
                </p>
                <p>
                  4. ALICI, siparişi onaylayarak işbu sözleşmenin tüm maddelerini okuduğunu, 
                  anladığını ve kabul ettiğini beyan eder.
                </p>
              </div>
            </motion.div>

            {/* Onay */}
            <div className="bg-[var(--color-beige)] rounded-2xl p-6 text-center">
              <p className="text-[var(--color-stone)]">
                Sipariş oluşturarak yukarıdaki sözleşme maddelerini okuduğunuzu ve 
                kabul ettiğinizi beyan etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

