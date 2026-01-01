'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
} from 'lucide-react';

const demoOrders = [
  {
    id: 'APR240101234',
    customer: { name: 'Ayşe Yılmaz', email: 'ayse@email.com' },
    date: '15 Ocak 2024, 14:30',
    items: [
      { name: 'Özel Tasarım Planlayıcı', quantity: 1, price: 189 },
    ],
    total: 189,
    paymentStatus: 'paid',
    orderStatus: 'processing',
  },
  {
    id: 'APR240101233',
    customer: { name: 'Mehmet Demir', email: 'mehmet@email.com' },
    date: '15 Ocak 2024, 12:15',
    items: [
      { name: '2024 Yıllık Planlayıcı', quantity: 1, price: 149 },
      { name: 'Premium Kalem Seti', quantity: 1, price: 129 },
    ],
    total: 278,
    paymentStatus: 'paid',
    orderStatus: 'shipped',
  },
  {
    id: 'APR240101232',
    customer: { name: 'Zeynep Kaya', email: 'zeynep@email.com' },
    date: '14 Ocak 2024, 18:45',
    items: [
      { name: 'A5 Noktalı Defter', quantity: 2, price: 158 },
    ],
    total: 158,
    paymentStatus: 'paid',
    orderStatus: 'delivered',
  },
  {
    id: 'APR240101231',
    customer: { name: 'Ali Öztürk', email: 'ali@email.com' },
    date: '14 Ocak 2024, 10:20',
    items: [
      { name: 'Haftalık Planlayıcı', quantity: 1, price: 79 },
    ],
    total: 79,
    paymentStatus: 'pending',
    orderStatus: 'pending',
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Onaylandı', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Hazırlanıyor', color: 'bg-purple-100 text-purple-800', icon: Clock },
  shipped: { label: 'Kargoda', color: 'bg-indigo-100 text-indigo-800', icon: Truck },
  delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'İptal', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const paymentStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'Ödendi', color: 'bg-green-100 text-green-800' },
  failed: { label: 'Başarısız', color: 'bg-red-100 text-red-800' },
  refunded: { label: 'İade Edildi', color: 'bg-gray-100 text-gray-800' },
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Siparişler</h1>
        <p className="text-gray-500">Tüm siparişleri görüntüleyin ve yönetin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bekleyen', value: '5', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Hazırlanan', value: '12', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Kargoda', value: '8', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Teslim Edilen', value: '156', color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-2xl p-6`}>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sipariş no veya müşteri ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
            >
              <option value="">Tüm Durumlar</option>
              <option value="pending">Bekleyen</option>
              <option value="processing">Hazırlanan</option>
              <option value="shipped">Kargoda</option>
              <option value="delivered">Teslim Edilen</option>
              <option value="cancelled">İptal</option>
            </select>
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]">
              <option value="">Ödeme Durumu</option>
              <option value="pending">Bekliyor</option>
              <option value="paid">Ödendi</option>
              <option value="failed">Başarısız</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="p-4 font-medium">Sipariş No</th>
                <th className="p-4 font-medium">Müşteri</th>
                <th className="p-4 font-medium">Tarih</th>
                <th className="p-4 font-medium">Ürünler</th>
                <th className="p-4 font-medium">Tutar</th>
                <th className="p-4 font-medium">Ödeme</th>
                <th className="p-4 font-medium">Durum</th>
                <th className="p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {demoOrders.map((order) => {
                const orderStatusInfo = statusConfig[order.orderStatus];
                const paymentStatusInfo = paymentStatusConfig[order.paymentStatus];

                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span className="font-mono font-medium">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4">
                      <div className="text-sm">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-gray-600">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">₺{order.total}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusInfo.color}`}>
                        {paymentStatusInfo.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${orderStatusInfo.color}`}>
                        <orderStatusInfo.icon className="w-3 h-3" />
                        {orderStatusInfo.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-5 h-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Toplam {demoOrders.length} sipariş
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              Önceki
            </button>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

