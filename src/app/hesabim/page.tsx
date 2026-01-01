'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

const menuItems = [
  { href: '/hesabim/siparislerim', label: 'Siparişlerim', icon: Package, count: 3 },
  { href: '/hesabim/favorilerim', label: 'Favorilerim', icon: Heart, count: 12 },
  { href: '/hesabim/adreslerim', label: 'Adreslerim', icon: MapPin },
  { href: '/hesabim/ayarlar', label: 'Hesap Ayarları', icon: Settings },
];

const recentOrders = [
  {
    id: 'APR240101234',
    date: '15 Ocak 2024',
    status: 'Kargoda',
    statusColor: 'bg-blue-100 text-blue-800',
    total: '₺189',
    items: 2,
  },
  {
    id: 'APR240101200',
    date: '10 Ocak 2024',
    status: 'Teslim Edildi',
    statusColor: 'bg-green-100 text-green-800',
    total: '₺129',
    items: 1,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Demo user if not logged in
  const displayUser = user || {
    name: 'Demo',
    surname: 'Kullanıcı',
    email: 'demo@apeirona.com',
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold">
                Merhaba, {displayUser.name}!
              </h1>
              <p className="text-white/80">{displayUser.email}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden">
              <nav className="p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--color-beige)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[var(--color-primary)]" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count && (
                        <span className="px-2 py-1 bg-[var(--color-beige)] rounded-full text-xs font-medium">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-[var(--color-stone)]" />
                    </div>
                  </Link>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Çıkış Yap</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Siparişler', value: '8', icon: Package },
                { label: 'Favoriler', value: '12', icon: Heart },
                { label: 'Adresler', value: '2', icon: MapPin },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-[var(--shadow-soft)] text-center"
                >
                  <stat.icon className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[var(--color-dark)]">{stat.value}</p>
                  <p className="text-sm text-[var(--color-stone)]">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-[var(--shadow-soft)]">
              <div className="p-6 border-b border-[var(--color-sand)]">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold">Son Siparişler</h2>
                  <Link
                    href="/hesabim/siparislerim"
                    className="text-sm text-[var(--color-primary)] hover:underline"
                  >
                    Tümünü Gör
                  </Link>
                </div>
              </div>

              {recentOrders.length > 0 ? (
                <div className="divide-y divide-[var(--color-sand)]">
                  {recentOrders.map((order) => (
                    <Link
                      key={order.id}
                      href={`/hesabim/siparislerim/${order.id}`}
                      className="flex items-center justify-between p-6 hover:bg-[var(--color-cream)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--color-beige)] rounded-xl flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-[var(--color-stone)]">
                            {order.date} • {order.items} ürün
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                        <p className="font-semibold mt-1">{order.total}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-[var(--color-stone)] mx-auto mb-4" />
                  <p className="text-[var(--color-stone)] mb-4">Henüz sipariş vermediniz</p>
                  <Link href="/urunler">
                    <Button variant="primary">Alışverişe Başla</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Planner CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] rounded-2xl p-8 text-white"
            >
              <h3 className="font-serif text-2xl font-bold mb-2">
                Kendi Planlayıcınızı Tasarlayın!
              </h3>
              <p className="text-white/80 mb-6">
                6 kolay adımda hayalinizdeki planlayıcıyı oluşturun.
              </p>
              <Link href="/planlayici-olustur">
                <Button variant="primary">Hemen Başla</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

