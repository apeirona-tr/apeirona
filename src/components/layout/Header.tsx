'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const navLinks = [
  { href: '/planlayici-olustur', label: 'Kendi Planlayıcını Yarat', isHighlight: true },
  { href: '/', label: 'Anasayfa' },
  { 
    href: '/urunler', 
    label: "Sanatın Mağazası",
    children: [
      { href: '/urunler?kategori=gunluk-planlayicilar', label: 'Günlük Planlayıcılar' },
      { href: '/urunler?kategori=haftalik-planlayicilar', label: 'Haftalık Planlayıcılar' },
      { href: '/urunler?kategori=bullet-defterler', label: 'Bullet Defterler' },
      { href: '/urunler?kategori=sinava-hazirlik', label: 'Sınava Hazırlık Defteri' },
      { href: '/urunler?kategori=to-do-listler', label: 'To-Do Listler' },
      { href: '/urunler?kategori=diyet-planlayicilar', label: 'Diyet Planlayıcılar' },
      { href: '/urunler?kategori=planlama-setleri', label: 'Planlama Setleri' },
      { href: '/urunler?kategori=kitap-okuma-defteri', label: 'Kitap Okuma Defteri' },
    ]
  },
  { href: '/hakkimizda', label: 'Biz Kimiz?' },
  { href: '/iletisim', label: 'Bize Ulaş' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { getTotalItems, openCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-soft)]' 
            : 'bg-white'
          }
        `}
      >
        {/* Main Header - Apeirona.com stilinde */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button - Sol */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-[var(--color-beige)] transition-colors"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[var(--color-charcoal)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--color-charcoal)]" />
              )}
            </motion.button>

            {/* Logo - Ortada */}
            <Link href="/" className="flex flex-col items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-center"
              >
                {/* Apeirona Logo - Özel font stilinde */}
                <h1 className="font-serif text-3xl md:text-4xl tracking-[0.3em] font-light text-[var(--color-dark)] uppercase">
                  APEIRONA
                </h1>
                <p className="text-[10px] tracking-[0.2em] text-[var(--color-stone)] uppercase mt-0.5">
                  Sınırsız Sanat
                </p>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Sol */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                      (link as any).isHighlight 
                        ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]' 
                        : 'text-[var(--color-charcoal)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {(link as any).isHighlight && <Sparkles className="w-4 h-4" />}
                    {link.label}
                    {link.children && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-[var(--shadow-medium)] overflow-hidden py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-3 text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-beige)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <div className="border-t border-[var(--color-sand)] mt-2 pt-2 px-5">
                          <Link
                            href="/urunler"
                            className="block py-2 text-sm font-medium text-[var(--color-primary)]"
                          >
                            Tümünü Gör →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-3 rounded-full hover:bg-[var(--color-beige)] transition-colors"
                aria-label="Ara"
              >
                <Search className="w-5 h-5 text-[var(--color-charcoal)]" />
              </motion.button>

              {/* User Account */}
              <Link href={isAuthenticated ? '/hesabim' : '/giris'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full hover:bg-[var(--color-beige)] transition-colors hidden md:flex"
                  aria-label="Hesabım"
                >
                  <User className="w-5 h-5 text-[var(--color-charcoal)]" />
                </motion.button>
              </Link>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCart}
                className="relative p-3 rounded-full hover:bg-[var(--color-beige)] transition-colors"
                aria-label="Sepet"
              >
                <ShoppingBag className="w-5 h-5 text-[var(--color-charcoal)]" />
                {cartItemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-dark)] text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItemCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="font-serif text-2xl tracking-[0.2em] font-light text-[var(--color-dark)] uppercase">
                      APEIRONA
                    </span>
                    <p className="text-[10px] tracking-[0.15em] text-[var(--color-stone)] uppercase">
                      Sınırsız Sanat
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-[var(--color-beige)]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium transition-colors text-[var(--color-charcoal)] hover:bg-[var(--color-beige)]"
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-[var(--color-sand)] pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-[var(--color-stone)] hover:text-[var(--color-primary)]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Özel Tasarım Butonu */}
                  <Link
                    href="/planlayici-olustur"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium transition-colors bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Kendi Planlayıcını Yarat
                    </span>
                  </Link>
                </nav>

                <div className="mt-8 pt-8 border-t border-[var(--color-sand)]">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <p className="text-sm text-[var(--color-stone)]">
                        Hoş geldin, <span className="font-medium text-[var(--color-charcoal)]">{user?.name}</span>
                      </p>
                      <Link
                        href="/hesabim"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full btn btn-primary text-center"
                      >
                        Hesabım
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/giris"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full btn btn-primary text-center"
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        href="/kayit"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full btn btn-outline text-center"
                      >
                        Kayıt Ol
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal - Apeirona.com stilinde */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50"
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl text-[var(--color-dark)]">Ürünleri Ara</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--color-beige)] transition-colors"
                >
                  <X className="w-6 h-6 text-[var(--color-charcoal)]" />
                </button>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4 mb-6">
                  {/* Kategori seçimi */}
                  <select className="px-4 py-3 rounded-lg border border-[var(--color-sand)] bg-white text-sm focus:outline-none focus:border-[var(--color-primary)]">
                    <option>Tüm Kategoriler</option>
                    <option>Günlük Planlayıcılar</option>
                    <option>Haftalık Planlayıcılar</option>
                    <option>Bullet Defterler</option>
                    <option>Sınava Hazırlık Defteri</option>
                    <option>To-Do List Defterler</option>
                    <option>Diyet Planlayıcılar</option>
                    <option>Planlama Setleri</option>
                    <option>Kitap Okuma Defteri</option>
                    <option>Kraft Ürünler</option>
                    <option>Kalem-Kalemlik</option>
                  </select>
                  
                  {/* Arama input */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Ürün Ara"
                      autoFocus
                      className="w-full pl-4 pr-12 py-3 text-base bg-white border border-[var(--color-sand)] rounded-lg focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--color-primary)] rounded-lg text-white">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Popüler Aramalar */}
                <div className="mt-8">
                  <p className="text-sm text-[var(--color-stone)] mb-4">Popüler Aramalar</p>
                  <div className="flex flex-wrap gap-2">
                    {['Haftalık Planlayıcı', 'Bullet Journal', 'Sınav Defteri', 'Planlama Seti', 'Diyet Takip'].map((term) => (
                      <button
                        key={term}
                        className="px-4 py-2 bg-[var(--color-beige)] rounded-full text-sm text-[var(--color-charcoal)] hover:bg-[var(--color-sand)] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Header;
