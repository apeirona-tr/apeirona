'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const demoUsers = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    email: 'ayse@example.com',
    phone: '+90 555 111 22 33',
    registeredAt: '2024-06-15',
    ordersCount: 8,
    totalSpent: 1456,
    status: 'active',
    avatar: 'AY',
  },
  {
    id: '2',
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '+90 555 222 33 44',
    registeredAt: '2024-08-22',
    ordersCount: 3,
    totalSpent: 489,
    status: 'active',
    avatar: 'MD',
  },
  {
    id: '3',
    name: 'Zeynep Kaya',
    email: 'zeynep@example.com',
    phone: '+90 555 333 44 55',
    registeredAt: '2024-09-10',
    ordersCount: 5,
    totalSpent: 892,
    status: 'active',
    avatar: 'ZK',
  },
  {
    id: '4',
    name: 'Ali Öztürk',
    email: 'ali@example.com',
    phone: '+90 555 444 55 66',
    registeredAt: '2024-11-05',
    ordersCount: 1,
    totalSpent: 149,
    status: 'inactive',
    avatar: 'AÖ',
  },
  {
    id: '5',
    name: 'Fatma Şahin',
    email: 'fatma@example.com',
    phone: '+90 555 555 66 77',
    registeredAt: '2024-12-01',
    ordersCount: 0,
    totalSpent: 0,
    status: 'active',
    avatar: 'FŞ',
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = demoUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
          <p className="text-gray-500">Kayıtlı kullanıcıları yönetin</p>
        </div>
        <Button variant="primary" leftIcon={<UserPlus className="w-5 h-5" />}>
          Kullanıcı Ekle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Kullanıcı', value: '1,245', color: 'bg-blue-500' },
          { label: 'Aktif Kullanıcı', value: '1,180', color: 'bg-green-500' },
          { label: 'Yeni (Bu Ay)', value: '87', color: 'bg-purple-500' },
          { label: 'Ortalama Sipariş', value: '3.2', color: 'bg-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-white font-bold">{stat.value.charAt(0)}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
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
              placeholder="Kullanıcı ara (ad veya e-posta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                </th>
                <th className="p-4 font-medium">Kullanıcı</th>
                <th className="p-4 font-medium">İletişim</th>
                <th className="p-4 font-medium">Kayıt Tarihi</th>
                <th className="p-4 font-medium">Siparişler</th>
                <th className="p-4 font-medium">Toplam Harcama</th>
                <th className="p-4 font-medium">Durum</th>
                <th className="p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.registeredAt).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user.ordersCount}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-[var(--color-dark)]">
                      {user.totalSpent.toLocaleString('tr-TR')}₺
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Ban className="w-3 h-3" />
                      )}
                      {user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Ban className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Toplam {filteredUsers.length} kullanıcı gösteriliyor
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
              Önceki
            </button>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              2
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

