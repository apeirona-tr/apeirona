'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Shield className="w-12 h-12 mx-auto mb-4 text-[var(--color-accent)]" />
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Gizlilik Sözleşmesi
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
          <div className="max-w-4xl mx-auto">
            {/* Quick Info Icons */}
            <div className="grid sm:grid-cols-4 gap-4 mb-12">
              <div className="bg-[var(--color-beige)] rounded-xl p-4 text-center">
                <Lock className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                <p className="text-sm text-[var(--color-stone)]">SSL Şifreleme</p>
              </div>
              <div className="bg-[var(--color-beige)] rounded-xl p-4 text-center">
                <Eye className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                <p className="text-sm text-[var(--color-stone)]">Şeffaflık</p>
              </div>
              <div className="bg-[var(--color-beige)] rounded-xl p-4 text-center">
                <Database className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                <p className="text-sm text-[var(--color-stone)]">Güvenli Depolama</p>
              </div>
              <div className="bg-[var(--color-beige)] rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-[var(--color-primary)]" />
                <p className="text-sm text-[var(--color-stone)]">KVKK Uyumlu</p>
              </div>
            </div>

            {/* Policy Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  1. Giriş
                </h2>
                <p className="text-[var(--color-stone)]">
                  Apeirona (&quot;biz&quot;, &quot;bizim&quot; veya &quot;şirket&quot;) olarak, 
                  kullanıcılarımızın gizliliğini korumayı taahhüt ediyoruz. Bu Gizlilik 
                  Politikası, kişisel verilerinizi nasıl topladığımızı, kullandığımızı, 
                  paylaştığımızı ve koruduğumuzu açıklamaktadır.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  2. Toplanan Bilgiler
                </h2>
                <div className="space-y-4 text-[var(--color-stone)]">
                  <p><strong className="text-[var(--color-dark)]">Kişisel Bilgiler:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ad, soyad</li>
                    <li>E-posta adresi</li>
                    <li>Telefon numarası</li>
                    <li>Teslimat ve fatura adresi</li>
                    <li>Ödeme bilgileri (kart bilgileri bizde saklanmaz)</li>
                  </ul>
                  
                  <p><strong className="text-[var(--color-dark)]">Otomatik Toplanan Bilgiler:</strong></p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>IP adresi</li>
                    <li>Tarayıcı tipi ve versiyonu</li>
                    <li>Cihaz bilgileri</li>
                    <li>Sayfa görüntüleme ve tıklama verileri</li>
                    <li>Çerezler ve benzeri teknolojiler</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  3. Bilgilerin Kullanımı
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p className="mb-4">Toplanan bilgiler aşağıdaki amaçlarla kullanılır:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Siparişlerinizi işlemek ve teslim etmek</li>
                    <li>Hesabınızı yönetmek</li>
                    <li>Müşteri hizmetleri sağlamak</li>
                    <li>Ürün ve hizmetlerimizi geliştirmek</li>
                    <li>Pazarlama iletişimleri göndermek (onayınızla)</li>
                    <li>Yasal yükümlülükleri yerine getirmek</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  4. Bilgi Paylaşımı
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p className="mb-4">Kişisel bilgileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kargo şirketleri (teslimat için gerekli bilgiler)</li>
                    <li>Ödeme işlemcileri (ödeme işlemleri için)</li>
                    <li>Yasal gereklilikler</li>
                    <li>Açık onayınızla</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  5. Çerezler
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p className="mb-4">
                    Web sitemizde çerezler kullanılmaktadır. Çerezler, site deneyiminizi 
                    kişiselleştirmemize ve analiz yapmamıza yardımcı olur.
                  </p>
                  <p>
                    Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, 
                    ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  6. Güvenlik
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p>
                    Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri 
                    uyguluyoruz:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>256-bit SSL şifreleme</li>
                    <li>Güvenli veri merkezleri</li>
                    <li>Düzenli güvenlik denetimleri</li>
                    <li>Erişim kontrolü ve yetkilendirme</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  7. Haklarınız (KVKK)
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p className="mb-4">6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                    <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                    <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                    <li>Silinmesini veya yok edilmesini isteme</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl shadow-sm p-8"
              >
                <h2 className="font-serif text-xl font-bold text-[var(--color-dark)] mb-4">
                  8. İletişim
                </h2>
                <div className="text-[var(--color-stone)]">
                  <p className="mb-4">
                    Gizlilik politikamız hakkında sorularınız veya talepleriniz için 
                    bizimle iletişime geçebilirsiniz:
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                    <a href="mailto:kvkk@apeirona.com" className="text-[var(--color-primary)] hover:underline">
                      kvkk@apeirona.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

