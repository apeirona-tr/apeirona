'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  FolderOpen,
  ChevronRight,
  GripVertical,
  Eye,
  EyeOff,
  X,
  Save,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const initialCategories = [
  {
    id: '1',
    name: 'Günlük Planlayıcılar',
    slug: 'gunluk-planlayicilar',
    description: 'Günlük planlama için tasarlanmış defterler',
    productCount: 24,
    isActive: true,
    image: '/images/categories/daily.jpg',
    order: 1,
  },
  {
    id: '2',
    name: 'Haftalık Planlayıcılar',
    slug: 'haftalik-planlayicilar',
    description: 'Haftalık görünümle planlarınızı organize edin',
    productCount: 18,
    isActive: true,
    image: '/images/categories/weekly.jpg',
    order: 2,
  },
  {
    id: '3',
    name: 'Bullet Defterler',
    slug: 'bullet-defterler',
    description: 'Bullet journal sistemi için tasarlanmış defterler',
    productCount: 42,
    isActive: true,
    image: '/images/categories/bullet.jpg',
    order: 3,
  },
  {
    id: '4',
    name: 'Sınava Hazırlık Defteri',
    slug: 'sinava-hazirlik-defteri',
    description: 'Sınavlara hazırlık için özel tasarlanmış defterler',
    productCount: 15,
    isActive: true,
    image: '/images/categories/exam.jpg',
    order: 4,
  },
  {
    id: '5',
    name: 'To-Do List Defterler',
    slug: 'to-do-list-defterler',
    description: 'Yapılacaklar listesi için tasarlanmış defterler',
    productCount: 30,
    isActive: true,
    image: '/images/categories/todo.jpg',
    order: 5,
  },
  {
    id: '6',
    name: 'Planlama Setleri',
    slug: 'planlama-setleri',
    description: 'Komple planlama setleri',
    productCount: 8,
    isActive: true,
    image: '/images/categories/sets.jpg',
    order: 6,
  },
  {
    id: '7',
    name: 'Noktalı Defter Setleri',
    slug: 'noktali-defter-setleri',
    description: 'Noktalı (dot grid) defter setleri',
    productCount: 12,
    isActive: false,
    image: '/images/categories/dotted.jpg',
    order: 7,
  },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  isActive: boolean;
  image: string;
  order: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
  });

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData({ ...formData, slug });
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: '',
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        productCount: 0,
        order: categories.length + 1,
      };
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const toggleActive = (id: string) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="text-gray-500">Ürün kategorilerini yönetin</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-5 h-5" />}
          onClick={() => openModal()}
        >
          Yeni Kategori
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Kategori ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
              !category.isActive ? 'opacity-60' : ''
            }`}
          >
            {/* Category Image */}
            <div className="relative h-32 bg-gradient-to-br from-[var(--color-beige)] to-[var(--color-sand)]">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FolderOpen className="w-12 h-12 text-[var(--color-stone)]" />
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => toggleActive(category.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    category.isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                  title={category.isActive ? 'Aktif' : 'Pasif'}
                >
                  {category.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {category.productCount} Ürün
                </span>
              </div>
            </div>

            {/* Category Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-400">/{category.slug}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openModal(category)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              {category.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {/* Add New Category Card */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: filteredCategories.length * 0.05 }}
          onClick={() => openModal()}
          className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 min-h-[200px] flex flex-col items-center justify-center gap-3 hover:border-[var(--color-primary)] hover:bg-[var(--color-beige)]/30 transition-colors"
        >
          <div className="w-12 h-12 bg-[var(--color-beige)] rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <span className="font-medium text-gray-600">Yeni Kategori Ekle</span>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold">
                  {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={generateSlug}
                    placeholder="Örn: Haftalık Planlayıcılar"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex">
                    <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm">
                      /kategoriler/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="haftalik-planlayicilar"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Kategori açıklaması..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görsel URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/images/categories/..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-gray-700">Aktif (Sitede görünsün)</span>
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  İptal
                </Button>
                <Button variant="primary" leftIcon={<Save className="w-5 h-5" />} onClick={handleSave}>
                  {editingCategory ? 'Güncelle' : 'Kaydet'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

