'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Settings,
  Palette,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  LogOut,
  BarChart3,
  Globe,
  Image,
  FileText,
  Megaphone,
} from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/urunler', label: 'Ürünler', icon: Package },
  { href: '/admin/siparisler', label: 'Siparişler', icon: ShoppingCart },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: Tag },
  { href: '/admin/planlayici-secenekleri', label: 'Planlayıcı Seçenekleri', icon: Palette },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/seo', label: 'SEO & Marketing', icon: Globe },
  { href: '/admin/kullanicilar', label: 'Kullanıcılar', icon: Users },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-40 bg-[var(--color-dark)] text-white
          transition-all duration-300 hidden lg:block
          ${sidebarOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link href="/admin" className="font-serif text-xl font-bold">
              Apeirona
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Siteye Dön</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[var(--color-dark)] text-white z-50 lg:hidden"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                <span className="font-serif text-xl font-bold">Apeirona</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${isActive
                          ? 'bg-[var(--color-accent)] text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ara..."
                className="bg-transparent border-none focus:outline-none w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-500">admin@apeirona.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

