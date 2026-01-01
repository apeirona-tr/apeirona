'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Globe,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  Palette,
  Tag,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const stats = [
  {
    title: 'Toplam Satış',
    value: '₺24,560',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500',
    period: 'Bu ay',
  },
  {
    title: 'Siparişler',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-blue-500',
    period: 'Bu ay',
  },
  {
    title: 'Ziyaretçiler',
    value: '12,543',
    change: '+15.3%',
    trend: 'up',
    icon: Eye,
    color: 'bg-purple-500',
    period: 'Bu ay',
  },
  {
    title: 'Dönüşüm Oranı',
    value: '%3.24',
    change: '+0.8%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-orange-500',
    period: 'Bu ay',
  },
];

const recentOrders = [
  {
    id: 'APR240101234',
    customer: 'Ayşe Yılmaz',
    product: 'Özel Tasarım Planlayıcı',
    amount: '₺189',
    status: 'Hazırlanıyor',
    statusColor: 'bg-yellow-100 text-yellow-800',
    statusIcon: Clock,
    date: '5 dk önce',
  },
  {
    id: 'APR240101233',
    customer: 'Mehmet Demir',
    product: '2024 Yıllık Planlayıcı',
    amount: '₺149',
    status: 'Kargoya Verildi',
    statusColor: 'bg-blue-100 text-blue-800',
    statusIcon: Package,
    date: '1 saat önce',
  },
  {
    id: 'APR240101232',
    customer: 'Zeynep Kaya',
    product: 'Premium Kalem Seti',
    amount: '₺129',
    status: 'Teslim Edildi',
    statusColor: 'bg-green-100 text-green-800',
    statusIcon: CheckCircle,
    date: '3 saat önce',
  },
  {
    id: 'APR240101231',
    customer: 'Ali Öztürk',
    product: 'A5 Noktalı Defter',
    amount: '₺79',
    status: 'Ödeme Bekleniyor',
    statusColor: 'bg-red-100 text-red-800',
    statusIcon: AlertCircle,
    date: '5 saat önce',
  },
];

const quickActions = [
  {
    title: 'Yeni Ürün Ekle',
    description: 'Mağazaya ürün ekleyin',
    href: '/admin/urunler/yeni',
    icon: Plus,
    color: 'bg-[var(--color-primary)]',
  },
  {
    title: 'Kategori Yönet',
    description: 'Kategorileri düzenleyin',
    href: '/admin/kategoriler',
    icon: Tag,
    color: 'bg-[var(--color-accent)]',
  },
  {
    title: 'Planlayıcı Seçenekleri',
    description: 'Özelleştirme ayarları',
    href: '/admin/planlayici-secenekleri',
    icon: Palette,
    color: 'bg-purple-500',
  },
  {
    title: 'SEO Ayarları',
    description: 'Arama motoru optimizasyonu',
    href: '/admin/seo',
    icon: Globe,
    color: 'bg-green-500',
  },
];

const systemStatus = [
  { name: 'Site Durumu', status: 'online', label: 'Çalışıyor' },
  { name: 'Ödeme Sistemi', status: 'online', label: 'Aktif (Test Modu)' },
  { name: 'Google Analytics', status: 'warning', label: 'Yapılandırılmadı' },
  { name: 'Meta Pixel', status: 'warning', label: 'Yapılandırılmadı' },
];

const lowStockProducts = [
  { name: 'Haftalık Planlayıcı - Botanik', stock: 3 },
  { name: 'Premium Kalem Seti Rose Gold', stock: 5 },
  { name: 'Bullet Journal Minimal', stock: 4 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Hoş geldiniz! İşte mağazanızın genel durumu.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" leftIcon={<ExternalLink className="w-4 h-4" />}>
              Siteyi Görüntüle
            </Button>
          </Link>
          <Button variant="primary" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{stat.period}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Son Siparişler</h2>
              <Link href="/admin/siparisler" className="text-sm text-[var(--color-primary)] hover:underline">
                Tümünü Gör →
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="p-4 font-medium">Sipariş</th>
                  <th className="p-4 font-medium">Müşteri</th>
                  <th className="p-4 font-medium">Tutar</th>
                  <th className="p-4 font-medium">Durum</th>
                  <th className="p-4 font-medium">Zaman</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-gray-400">{order.product}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{order.customer}</td>
                    <td className="p-4 font-medium">{order.amount}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                        <order.statusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Hızlı İşlemler</h2>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-[var(--color-beige)] transition-colors group"
                >
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Sistem Durumu</h2>
            <div className="space-y-3">
              {systemStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className={`
                    inline-flex items-center gap-1.5 text-xs font-medium
                    ${item.status === 'online' ? 'text-green-600' : 'text-yellow-600'}
                  `}>
                    <span className={`w-2 h-2 rounded-full ${item.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/admin/seo" className="block mt-4">
              <Button variant="outline" size="sm" fullWidth leftIcon={<Settings className="w-4 h-4" />}>
                Analytics Ayarla
              </Button>
            </Link>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Düşük Stok Uyarısı</h2>
              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                {lowStockProducts.length}
              </span>
            </div>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-700 truncate flex-1">{product.name}</span>
                  <span className="text-sm font-medium text-red-600 ml-2">{product.stock} adet</span>
                </div>
              ))}
            </div>
            <Link href="/admin/urunler" className="block mt-4">
              <Button variant="outline" size="sm" fullWidth>
                Stokları Yönet
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Detaylı Analytics</h3>
              <p className="text-white/80">
                Ziyaretçi davranışları, dönüşüm oranları ve satış analizleri
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/analytics">
              <Button variant="secondary">Analytics Dashboard</Button>
            </Link>
            <Link href="/admin/seo">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                SEO Ayarları
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
