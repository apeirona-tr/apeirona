'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Mail, 
  Heart
} from 'lucide-react';

const footerLinks = {
  policies: {
    title: 'Politikalar',
    links: [
      { href: '/sss', label: 'Sıkça Sorulan Sorular' },
      { href: '/iade-politikasi', label: 'Eksik İade ve Geri Ödeme Politikası' },
      { href: '/gizlilik-sozlesmesi', label: 'Gizlilik Sözleşmesi' },
      { href: '/mesafeli-satis-sozlesmesi', label: 'Mesafeli Satış Sözleşmesi' },
    ],
  },
};

const categories = [
  { href: '/urunler?kategori=gunluk-planlayicilar', label: 'Günlük Planlayıcılar' },
  { href: '/urunler?kategori=haftalik-planlayicilar', label: 'Haftalık Planlayıcılar' },
  { href: '/urunler?kategori=bullet-defterler', label: 'Bullet Defterler' },
  { href: '/urunler?kategori=sinava-hazirlik', label: 'Sınava Hazırlık Defteri' },
  { href: '/urunler?kategori=planlama-setleri', label: 'Planlama Setleri' },
  { href: '/urunler?kategori=to-do-listler', label: 'To-Do Listler' },
  { href: '/urunler?kategori=kitap-okuma-defteri', label: 'Kitap Okuma Defteri' },
  { href: '/urunler?kategori=diyet-planlayicilar', label: 'Diyet Planlayıcılar' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-dark)] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl tracking-[0.2em] font-light uppercase">
                APEIRONA
              </h2>
              <p className="text-[10px] tracking-[0.15em] text-white/50 uppercase mt-0.5">
                Sınırsız Sanat
              </p>
            </Link>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              El yapımı, özgün tasarımlarla hazırlanmış planlayıcılar ve kırtasiye ürünleri.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/apeirona"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-white/10 hover:bg-[var(--color-accent)] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="font-medium text-lg mb-6">Kategoriler</h4>
            <ul className="space-y-2.5">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors inline-block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Politikalar */}
          <div>
            <h4 className="font-medium text-lg mb-6">{footerLinks.policies.title}</h4>
            <ul className="space-y-2.5">
              {footerLinks.policies.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors inline-block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-medium text-lg mb-6">İletişim</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                <a href="mailto:info@apeirona.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  info@apeirona.com
                </a>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Kadıköy, İstanbul, Türkiye
              </p>
              <Link 
                href="/planlayici-olustur"
                className="inline-flex items-center gap-2 px-4 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] rounded-lg font-medium text-sm transition-colors"
              >
                <motion.span whileHover={{ scale: 1.05 }}>✨</motion.span>
                Kendi Planlayıcını Yarat
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2024 Apeirona. Tüm hakları saklıdır.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              <Heart className="w-4 h-4 text-[var(--color-accent)]" /> ile yapıldı
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
