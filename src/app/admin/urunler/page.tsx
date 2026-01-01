'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  Upload,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const demoProducts = [
  {
    id: '1',
    name: '2024 Yıllık Planlayıcı - Botanik Serisi',
    sku: 'APR-PLN-001',
    price: 189,
    discountPrice: 149,
    stock: 45,
    category: 'Planlayıcı Defterler',
    status: 'active',
    image: '/images/products/planner-1.jpg',
  },
  {
    id: '2',
    name: 'A5 Noktalı Defter - Minimal Beyaz',
    sku: 'APR-NTB-001',
    price: 79,
    stock: 120,
    category: 'Defterler',
    status: 'active',
    image: '/images/products/notebook-1.jpg',
  },
  {
    id: '3',
    name: 'Premium Kalem Seti - Rose Gold',
    sku: 'APR-PEN-001',
    price: 129,
    stock: 0,
    category: 'Kırtasiye',
    status: 'out_of_stock',
    image: '/images/products/pen-set-1.jpg',
  },
  {
    id: '4',
    name: 'Haftalık Planlayıcı - Geometrik',
    sku: 'APR-PLN-002',
    price: 99,
    discountPrice: 79,
    stock: 67,
    category: 'Planlayıcı Defterler',
    status: 'active',
    image: '/images/products/planner-2.jpg',
  },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === demoProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(demoProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürünler</h1>
          <p className="text-gray-500">Mağazanızdaki tüm ürünleri yönetin</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/urunler/import">
            <Button variant="outline" leftIcon={<Upload className="w-5 h-5" />}>
              İçe Aktar
            </Button>
          </Link>
          <a href="/api/products/import?format=json" download>
            <Button variant="outline" leftIcon={<Download className="w-5 h-5" />}>
              Dışa Aktar
            </Button>
          </a>
          <Link href="/admin/urunler/yeni">
            <Button variant="primary" leftIcon={<Plus className="w-5 h-5" />}>
              Yeni Ürün
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]">
              <option value="">Tüm Kategoriler</option>
              <option value="planlayici">Planlayıcı Defterler</option>
              <option value="defter">Defterler</option>
              <option value="kirtasiye">Kırtasiye</option>
            </select>
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]">
              <option value="">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
              <option value="out_of_stock">Stokta Yok</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === demoProducts.length}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                </th>
                <th className="p-4 font-medium">Ürün</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Fiyat</th>
                <th className="p-4 font-medium">Stok</th>
                <th className="p-4 font-medium">Durum</th>
                <th className="p-4 font-medium">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {demoProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--color-beige)] rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-[var(--color-stone)]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{product.sku}</td>
                  <td className="p-4 text-gray-600">{product.category}</td>
                  <td className="p-4">
                    {product.discountPrice ? (
                      <div>
                        <span className="font-medium text-[var(--color-error)]">
                          {product.discountPrice}₺
                        </span>
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {product.price}₺
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">{product.price}₺</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${
                        product.stock === 0
                          ? 'text-red-600'
                          : product.stock < 10
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'out_of_stock'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.status === 'active'
                        ? 'Aktif'
                        : product.status === 'out_of_stock'
                        ? 'Stokta Yok'
                        : 'Pasif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-gray-500" />
                      </button>
                      <Link
                        href={`/admin/urunler/${product.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5 text-gray-500" />
                      </Link>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-500" />
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
            Toplam {demoProducts.length} üründen 1-{demoProducts.length} arası gösteriliyor
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

