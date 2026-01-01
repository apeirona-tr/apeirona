'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, Package, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
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
            <RefreshCw className="w-12 h-12 mx-auto mb-4 text-[var(--color-accent)]" />
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              İade ve Değişim Politikası
            </h1>
            <p className="text-white/80">
              Müşteri memnuniyeti bizim için en önemli önceliktir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Info */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-[var(--color-beige)] rounded-2xl p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-[var(--color-primary)]" />
                <h3 className="font-semibold text-[var(--color-dark)] mb-1">14 Gün</h3>
                <p className="text-sm text-[var(--color-stone)]">İade Süresi</p>
              </div>
              <div className="bg-[var(--color-beige)] rounded-2xl p-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-3 text-[var(--color-primary)]" />
                <h3 className="font-semibold text-[var(--color-dark)] mb-1">Orijinal Paket</h3>
                <p className="text-sm text-[var(--color-stone)]">Ambalajlı Olmalı</p>
              </div>
              <div className="bg-[var(--color-beige)] rounded-2xl p-6 text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 text-[var(--color-primary)]" />
                <h3 className="font-semibold text-[var(--color-dark)] mb-1">Ücretsiz</h3>
                <p className="text-sm text-[var(--color-stone)]">Hasarlı Ürün İadesi</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm p-8 mb-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-4">
                  Genel Koşullar
                </h2>
                <div className="space-y-4 text-[var(--color-stone)]">
                  <p>
                    Apeirona olarak müşteri memnuniyetini en üst düzeyde tutmak için esnek iade 
                    politikası uyguluyoruz. Satın aldığınız ürünleri aşağıdaki koşullar dahilinde 
                    iade edebilirsiniz:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ürünün teslim tarihinden itibaren 14 gün içinde iade talebi oluşturulmalıdır.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ürün kullanılmamış, orijinal ambalajında ve tüm etiketleri ile birlikte olmalıdır.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Fatura veya sipariş belgesi ile birlikte iade edilmelidir.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-8 mb-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-4">
                  İade Edilemeyecek Ürünler
                </h2>
                <div className="space-y-3 text-[var(--color-stone)]">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>&quot;Kendi Planlayıcını Yarat&quot; modülü ile oluşturulan kişiye özel ürünler 
                    (üretim hatası hariç)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Kullanılmış, yazılmış veya hasar görmüş ürünler</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Orijinal ambalajı açılmış hijyen ürünleri</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>İndirimli/kampanyalı ürünler (aksi belirtilmedikçe)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-8 mb-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-4">
                  İade Süreci
                </h2>
                <ol className="space-y-4 text-[var(--color-stone)]">
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                    <div>
                      <strong className="text-[var(--color-dark)]">İade Talebi Oluşturun</strong>
                      <p>Hesabınıza giriş yaparak ilgili siparişten iade talebi oluşturun veya 
                      info@apeirona.com adresine mail gönderin.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                    <div>
                      <strong className="text-[var(--color-dark)]">Onay Bekleyin</strong>
                      <p>İade talebiniz 1-2 iş günü içinde değerlendirilecek ve size kargo 
                      bilgileri gönderilecektir.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                    <div>
                      <strong className="text-[var(--color-dark)]">Ürünü Gönderin</strong>
                      <p>Ürünü orijinal ambalajında, fatura ile birlikte belirtilen adrese gönderin.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                    <div>
                      <strong className="text-[var(--color-dark)]">Geri Ödeme</strong>
                      <p>Ürün tarafımıza ulaştıktan sonra 3-5 iş günü içinde ödemeniz iade edilecektir.</p>
                    </div>
                  </li>
                </ol>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-4">
                  Kargo Ücreti
                </h2>
                <div className="space-y-3 text-[var(--color-stone)]">
                  <p>
                    <strong className="text-[var(--color-dark)]">Hasarlı/Hatalı Ürün:</strong> Kargo 
                    ücreti tarafımızca karşılanır.
                  </p>
                  <p>
                    <strong className="text-[var(--color-dark)]">Müşteri Kaynaklı İade:</strong> Kargo 
                    ücreti müşteriye aittir.
                  </p>
                  <p>
                    <strong className="text-[var(--color-dark)]">Değişim:</strong> İlk değişim ücretsizdir, 
                    sonraki değişimlerde kargo ücreti müşteriye aittir.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link
                href="/sss"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Sıkça Sorulan Sorular
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

