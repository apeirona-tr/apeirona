'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const stats = [
  {
    title: 'Toplam Ziyaretçi',
    value: '12,543',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500',
    comparison: 'Geçen aya göre',
  },
  {
    title: 'Sayfa Görüntüleme',
    value: '48,291',
    change: '+22.8%',
    trend: 'up',
    icon: Eye,
    color: 'bg-purple-500',
    comparison: 'Geçen aya göre',
  },
  {
    title: 'Dönüşüm Oranı',
    value: '3.24%',
    change: '+0.8%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-green-500',
    comparison: 'Geçen aya göre',
  },
  {
    title: 'Ortalama Sipariş',
    value: '₺186',
    change: '-2.1%',
    trend: 'down',
    icon: DollarSign,
    color: 'bg-orange-500',
    comparison: 'Geçen aya göre',
  },
];

const topProducts = [
  { name: 'Haftalık Planlayıcı - Botanik', views: 1245, sales: 89, revenue: '₺8,721' },
  { name: 'Bullet Journal - Minimal', views: 987, sales: 67, revenue: '₺5,963' },
  { name: 'Günlük Planlayıcı - Kızıl Güneş', views: 876, sales: 54, revenue: '₺5,346' },
  { name: 'Premium Kalem Seti', views: 654, sales: 43, revenue: '₺5,547' },
  { name: 'Ajanda 2024 - Deri Kapak', views: 543, sales: 32, revenue: '₺6,368' },
];

const trafficSources = [
  { source: 'Organik Arama', visitors: 4521, percentage: 36, color: 'bg-green-500' },
  { source: 'Sosyal Medya', visitors: 3245, percentage: 26, color: 'bg-blue-500' },
  { source: 'Direkt Trafik', visitors: 2456, percentage: 20, color: 'bg-purple-500' },
  { source: 'Referral', visitors: 1234, percentage: 10, color: 'bg-orange-500' },
  { source: 'E-posta', visitors: 987, percentage: 8, color: 'bg-pink-500' },
];

const topPages = [
  { page: '/', title: 'Ana Sayfa', views: 12543, avgTime: '2:34' },
  { page: '/urunler', title: 'Ürünler', views: 8765, avgTime: '3:12' },
  { page: '/planlayici-olustur', title: 'Planlayıcı Oluştur', views: 5432, avgTime: '5:45' },
  { page: '/urunler?kategori=haftalik-planlayicilar', title: 'Haftalık Planlayıcılar', views: 4321, avgTime: '2:56' },
  { page: '/urun/haftalik-planlayici-botanik', title: 'Haftalık Planlayıcı - Botanik', views: 3456, avgTime: '4:23' },
];

const deviceStats = [
  { device: 'Mobil', icon: Smartphone, percentage: 62, color: 'text-blue-500' },
  { device: 'Masaüstü', icon: Monitor, percentage: 31, color: 'text-purple-500' },
  { device: 'Tablet', icon: Tablet, percentage: 7, color: 'text-orange-500' },
];

const conversionFunnel = [
  { stage: 'Ziyaretçiler', count: 12543, percentage: 100 },
  { stage: 'Ürün Görüntüleme', count: 8234, percentage: 65.7 },
  { stage: 'Sepete Ekleme', count: 2456, percentage: 19.6 },
  { stage: 'Ödeme Başlatma', count: 876, percentage: 7.0 },
  { stage: 'Satın Alma', count: 406, percentage: 3.2 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500">Site performansı ve kullanıcı davranışları</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="7d">Son 7 Gün</option>
            <option value="30d">Son 30 Gün</option>
            <option value="90d">Son 90 Gün</option>
            <option value="1y">Son 1 Yıl</option>
          </select>
          <Button
            variant="outline"
            leftIcon={<RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            Yenile
          </Button>
          <Button variant="outline" leftIcon={<Download className="w-5 h-5" />}>
            Rapor İndir
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
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                  <span className="text-gray-400 ml-1">{stat.comparison}</span>
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
        {/* Traffic Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Ziyaretçi Trendi</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-primary)] rounded-full"></span>
                Ziyaretçiler
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-accent)] rounded-full"></span>
                Sayfa Görüntüleme
              </span>
            </div>
          </div>
          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Grafik alanı</p>
              <p className="text-sm">Gerçek veriler için Google Analytics entegrasyonu gerekli</p>
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Cihaz Dağılımı</h2>
          <div className="space-y-6">
            {deviceStats.map((device) => (
              <div key={device.device}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <device.icon className={`w-5 h-5 ${device.color}`} />
                    <span className="text-gray-700">{device.device}</span>
                  </div>
                  <span className="font-semibold">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`h-2 rounded-full ${device.color.replace('text-', 'bg-')}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini donut chart placeholder */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="352"
                    strokeDashoffset={352 - (352 * 62) / 100}
                    className="transition-all duration-500"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="352"
                    strokeDashoffset={352 - (352 * 31) / 100}
                    className="transition-all duration-500"
                    style={{ transform: 'rotate(223.2deg)', transformOrigin: 'center' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">12.5K</p>
                    <p className="text-xs text-gray-500">Toplam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Trafik Kaynakları</h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${source.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">{source.source}</span>
                    <span className="text-gray-500 text-sm">{source.visitors.toLocaleString()} ziyaretçi</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-2 rounded-full ${source.color}`}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700 w-12 text-right">
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Dönüşüm Hunisi</h2>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{stage.stage}</span>
                  <div className="text-right">
                    <span className="font-semibold">{stage.count.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm ml-2">({stage.percentage}%)</span>
                  </div>
                </div>
                <div
                  className="h-8 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg transition-all duration-500 flex items-center justify-center"
                  style={{ width: `${stage.percentage}%` }}
                >
                  {index === conversionFunnel.length - 1 && (
                    <span className="text-white text-sm font-medium">✓ Satış</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">En Çok Görüntülenen Ürünler</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="p-4 font-medium">Ürün</th>
                  <th className="p-4 font-medium text-right">Görüntüleme</th>
                  <th className="p-4 font-medium text-right">Satış</th>
                  <th className="p-4 font-medium text-right">Gelir</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.name} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[var(--color-beige)] rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right text-gray-600">{product.views.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-600">{product.sales}</td>
                    <td className="p-4 text-right font-medium text-green-600">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">En Popüler Sayfalar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="p-4 font-medium">Sayfa</th>
                  <th className="p-4 font-medium text-right">Görüntüleme</th>
                  <th className="p-4 font-medium text-right">Ort. Süre</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.page} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-gray-400">{page.page}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right text-gray-600">{page.views.toLocaleString()}</td>
                    <td className="p-4 text-right text-gray-600">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Real-time Hint */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Gerçek Zamanlı Veriler</h3>
            <p className="text-white/80">
              Google Analytics 4 ve Tag Manager entegrasyonu ile gerçek zamanlı verilere erişin.
              SEO ayarlarından tracking ID'lerinizi ekleyin.
            </p>
          </div>
          <Button variant="secondary">
            SEO Ayarları
          </Button>
        </div>
      </div>
    </div>
  );
}

