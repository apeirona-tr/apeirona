'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Truck, CreditCard, RefreshCw, Package } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    id: 'siparis',
    name: 'Sipariş & Kargo',
    icon: Truck,
    questions: [
      {
        q: 'Siparişim ne zaman kargoya verilir?',
        a: 'Siparişler genellikle 1-3 iş günü içinde hazırlanır ve kargoya verilir. Özel üretim ürünlerde bu süre 5-7 iş günü olabilir. Sipariş durumunuzu hesabınızdan takip edebilirsiniz.',
      },
      {
        q: 'Kargo ücreti ne kadar?',
        a: '150₺ ve üzeri siparişlerde kargo ücretsizdir. 150₺ altı siparişlerde kargo ücreti 29,90₺\'dir.',
      },
      {
        q: 'Hangi kargo firması ile gönderim yapılıyor?',
        a: 'Siparişlerimiz Yurtiçi Kargo ve Aras Kargo ile gönderilmektedir. Tercih ettiğiniz kargo firmasını sipariş sırasında seçebilirsiniz.',
      },
      {
        q: 'Siparişimi nasıl takip edebilirim?',
        a: 'Siparişiniz kargoya verildiğinde size SMS ve e-posta ile takip numarası gönderilir. Ayrıca hesabınıza giriş yaparak sipariş durumunu kontrol edebilirsiniz.',
      },
    ],
  },
  {
    id: 'odeme',
    name: 'Ödeme',
    icon: CreditCard,
    questions: [
      {
        q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        a: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Kredi kartı ile taksitli ödeme imkanı da sunuyoruz.',
      },
      {
        q: 'Taksit seçenekleri nelerdir?',
        a: 'Anlaşmalı bankalarla 2, 3, 6 ve 9 taksit seçenekleri sunulmaktadır. Taksit seçenekleri ödeme sayfasında görüntülenir.',
      },
      {
        q: 'Ödeme bilgilerim güvende mi?',
        a: 'Evet, ödeme altyapımız iyzico tarafından sağlanmaktadır. Tüm işlemler 256-bit SSL şifreleme ile korunur ve kart bilgileriniz bizde saklanmaz.',
      },
    ],
  },
  {
    id: 'iade',
    name: 'İade & Değişim',
    icon: RefreshCw,
    questions: [
      {
        q: 'İade koşulları nelerdir?',
        a: 'Ürünlerimizi teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz. Ürünün kullanılmamış, orijinal ambalajında ve etiketli olması gerekmektedir.',
      },
      {
        q: 'Özel üretim ürünleri iade edebilir miyim?',
        a: 'Kişiye özel hazırlanan ürünler (Kendi Planlayıcını Yarat modülü ile oluşturulan ürünler) üretim hatası dışında iade edilememektedir.',
      },
      {
        q: 'İade işlemini nasıl başlatabilirim?',
        a: 'Hesabınıza giriş yaparak ilgili siparişin detaylarından "İade Talebi Oluştur" butonuna tıklayabilirsiniz. Alternatif olarak info@apeirona.com adresine mail atabilirsiniz.',
      },
      {
        q: 'İade ücreti ödemem gerekiyor mu?',
        a: 'Üründe herhangi bir sorun veya hata varsa iade ücreti tarafımızca karşılanır. Müşteri kaynaklı iadelerde kargo ücreti müşteriye aittir.',
      },
    ],
  },
  {
    id: 'urun',
    name: 'Ürünler',
    icon: Package,
    questions: [
      {
        q: '"Kendi Planlayıcını Yarat" nasıl çalışıyor?',
        a: 'Bu özellik ile adım adım kendi planlayıcınızı tasarlayabilirsiniz. Defter tipini, iç sayfa tasarımını, kapak modelini, spiral tipini ve rengini, paketleme seçeneklerini seçerek size özel bir ürün oluşturabilirsiniz.',
      },
      {
        q: 'Ürünler el yapımı mı?',
        a: 'Evet, tüm ürünlerimiz atölyemizde özenle el yapımı olarak hazırlanmaktadır. Bu nedenle her ürün benzersizdir.',
      },
      {
        q: 'Kurumsal sipariş verebilir miyim?',
        a: 'Evet, kurumsal siparişler için özel fiyatlandırma ve tasarım hizmeti sunuyoruz. Detaylı bilgi için info@apeirona.com adresine mail atabilirsiniz.',
      },
      {
        q: 'Ürünlerde kullanılan malzemeler nelerdir?',
        a: 'Premium kalitede 100-120gr ivory kağıt, dayanıklı sert kapak malzemeleri ve yüksek kaliteli metal spiraller kullanıyoruz. Tüm malzemelerimiz çevre dostudur.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('siparis');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    if (openQuestions.includes(question)) {
      setOpenQuestions(openQuestions.filter((q) => q !== question));
    } else {
      setOpenQuestions([...openQuestions, question]);
    }
  };

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const currentCategory = filteredCategories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-dark)] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-[var(--color-accent)]" />
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Aradığınız cevabı bulamadınız mı? Bize ulaşın!
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Soru ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[var(--color-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-[var(--color-dark)] mb-4">
                  Kategoriler
                </h2>
                <nav className="space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left
                        ${activeCategory === category.id
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'hover:bg-[var(--color-beige)]'
                        }
                      `}
                    >
                      <category.icon className="w-5 h-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {currentCategory?.questions.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center">
                    <p className="text-[var(--color-stone)]">
                      Aramanızla eşleşen soru bulunamadı.
                    </p>
                  </div>
                ) : (
                  currentCategory?.questions.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.q)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className="font-medium text-[var(--color-dark)] pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[var(--color-stone)] transition-transform ${
                            openQuestions.includes(item.q) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openQuestions.includes(item.q) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-5 text-[var(--color-stone)] border-t border-gray-100 pt-4">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[var(--color-beige)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[var(--color-dark)] mb-4">
            Cevabınızı bulamadınız mı?
          </h2>
          <p className="text-[var(--color-stone)] mb-8">
            Ekibimiz size yardımcı olmaktan mutluluk duyar.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Bize Ulaşın
          </Link>
        </div>
      </section>
    </div>
  );
}

