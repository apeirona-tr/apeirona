'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    content: 'Kadıköy, İstanbul, Türkiye',
    link: 'https://maps.google.com',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+90 555 123 45 67',
    link: 'tel:+905551234567',
  },
  {
    icon: Mail,
    title: 'E-posta',
    content: 'info@apeirona.com',
    link: 'mailto:info@apeirona.com',
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    content: 'Pzt-Cmt: 09:00 - 18:00',
    link: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simüle edilmiş form gönderimi
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Bize Ulaşın
            </h1>
            <p className="text-xl text-white/80">
              Sorularınız, önerileriniz veya özel siparişleriniz için bize ulaşın.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-4">
                  İletişim Bilgileri
                </h2>
                <p className="text-[var(--color-stone)]">
                  Size yardımcı olmaktan mutluluk duyarız. Aşağıdaki kanallardan 
                  bize ulaşabilirsiniz.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-beige)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--color-dark)]">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-[var(--color-stone)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-[var(--color-stone)]">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-medium text-[var(--color-dark)] mb-4">
                  Sosyal Medya
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/apeirona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[var(--color-beige)] rounded-xl flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/905551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[var(--color-beige)] rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="font-serif text-2xl font-bold text-[var(--color-dark)] mb-6">
                  Mesaj Gönderin
                </h2>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                  >
                    <p className="text-green-800 font-medium">
                      ✓ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                      Konu *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="">Konu Seçin</option>
                      <option value="siparis">Sipariş Hakkında</option>
                      <option value="urun">Ürün Bilgisi</option>
                      <option value="iade">İade/Değişim</option>
                      <option value="ozel">Özel Sipariş</option>
                      <option value="isbirligi">İş Birliği</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    leftIcon={<Send className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Mesaj Gönder
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-beige)]">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
            <p className="text-[var(--color-stone)]">
              Harita entegrasyonu için Google Maps API anahtarı gereklidir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

