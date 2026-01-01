'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Tag,
  Package,
  FileText,
  Settings,
  Search as SearchIcon,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const categories = [
  { id: '1', name: 'Günlük Planlayıcılar' },
  { id: '2', name: 'Haftalık Planlayıcılar' },
  { id: '3', name: 'Bullet Defterler' },
  { id: '4', name: 'Sınava Hazırlık Defteri' },
  { id: '5', name: 'To-Do List Defterler' },
  { id: '6', name: 'Planlama Setleri' },
  { id: '7', name: 'Noktalı Defter Setleri' },
];

const series = [
  { id: '1', name: 'Güneş Dağları Serisi' },
  { id: '2', name: 'İkebana Serisi' },
  { id: '3', name: 'Hakugawa Serisi' },
  { id: '4', name: 'Botanik Serisi' },
  { id: '5', name: 'Ganba Serisi' },
];

type TabType = 'general' | 'media' | 'pricing' | 'seo' | 'advanced';

export default function NewProductPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: '',
    series: '',
    price: '',
    discountPrice: '',
    sku: '',
    stock: '',
    weight: '',
    dimensions: { width: '', height: '', depth: '' },
    status: 'draft',
    isFeatured: false,
    isNew: false,
    // SEO
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    canonicalUrl: '',
    // Advanced
    specifications: [] as { key: string; value: string }[],
  });

  const tabs = [
    { id: 'general', label: 'Genel Bilgiler', icon: Package },
    { id: 'media', label: 'Medya', icon: ImageIcon },
    { id: 'pricing', label: 'Fiyat & Stok', icon: Tag },
    { id: 'seo', label: 'SEO', icon: SearchIcon },
    { id: 'advanced', label: 'Gelişmiş', icon: Settings },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }],
    });
  };

  const handleRemoveSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: newSpecs });
  };

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to save product
    console.log('Form data:', formData);
    console.log('Images:', images);
    console.log('Tags:', tags);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/urunler">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
            <p className="text-gray-500">Mağazanıza yeni bir ürün ekleyin</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Taslak Kaydet</Button>
          <Button variant="primary" leftIcon={<Save className="w-5 h-5" />}>
            Yayınla
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`
                      flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors
                      ${activeTab === tab.id
                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ürün Adı *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={generateSlug}
                      placeholder="Örn: Haftalık Planlayıcı - Botanik Serisi"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug *
                      </label>
                      <div className="flex">
                        <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm">
                          /urun/
                        </span>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          placeholder="haftalik-planlayici-botanik"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:border-[var(--color-primary)]"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU (Stok Kodu)
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        placeholder="APR-PLN-001"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kısa Açıklama
                    </label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder="Ürün listelerinde görünecek kısa açıklama"
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detaylı Açıklama
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Ürün hakkında detaylı bilgiler..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      HTML etiketleri kullanabilirsiniz: &lt;b&gt;, &lt;i&gt;, &lt;ul&gt;, &lt;li&gt;
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategori *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        required
                      >
                        <option value="">Kategori Seçin</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seri
                      </label>
                      <select
                        name="series"
                        value={formData.series}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="">Seri Seçin (Opsiyonel)</option>
                        {series.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ürün Görselleri
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 px-2 py-1 bg-[var(--color-primary)] text-white text-xs rounded-full">
                              Ana Görsel
                            </span>
                          )}
                        </div>
                      ))}
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Görsel Ekle</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            // In production, upload to storage and get URL
                            const files = Array.from(e.target.files || []);
                            files.forEach(file => {
                              const reader = new FileReader();
                              reader.onload = () => {
                                setImages(prev => [...prev, reader.result as string]);
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      İlk yüklenen görsel ana görsel olarak kullanılır. Sürükleyerek sıralayabilirsiniz.
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fiyat (₺) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        İndirimli Fiyat (₺)
                      </label>
                      <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stok Adedi *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ağırlık (g)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Boyutlar (cm)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input
                          type="number"
                          placeholder="Genişlik"
                          value={formData.dimensions.width}
                          onChange={(e) => setFormData({
                            ...formData,
                            dimensions: { ...formData.dimensions, width: e.target.value }
                          })}
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Yükseklik"
                          value={formData.dimensions.height}
                          onChange={(e) => setFormData({
                            ...formData,
                            dimensions: { ...formData.dimensions, height: e.target.value }
                          })}
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Derinlik"
                          value={formData.dimensions.depth}
                          onChange={(e) => setFormData({
                            ...formData,
                            dimensions: { ...formData.dimensions, depth: e.target.value }
                          })}
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Google Önizleme
                    </h4>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <p className="text-blue-600 text-sm">
                        apeirona.com › urun › {formData.slug || 'urun-adi'}
                      </p>
                      <h5 className="text-lg text-blue-800 font-medium mt-1">
                        {formData.seoTitle || formData.name || 'Ürün Başlığı'}
                      </h5>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {formData.seoDescription || formData.shortDescription || 'Ürün açıklaması burada görünecek...'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Başlığı
                    </label>
                    <input
                      type="text"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      placeholder="Google'da görünecek başlık"
                      maxLength={60}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      {formData.seoTitle.length}/60 karakter (Önerilen: 50-60)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Açıklaması
                    </label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      placeholder="Google'da görünecek açıklama"
                      maxLength={160}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      {formData.seoDescription.length}/160 karakter (Önerilen: 120-160)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anahtar Kelimeler
                    </label>
                    <input
                      type="text"
                      name="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={handleInputChange}
                      placeholder="planlayıcı, ajanda, haftalık plan, defter"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Virgülle ayırarak yazın
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Canonical URL (Opsiyonel)
                    </label>
                    <input
                      type="url"
                      name="canonicalUrl"
                      value={formData.canonicalUrl}
                      onChange={handleInputChange}
                      placeholder="https://apeirona.com/urun/..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Duplicate içerik durumunda asıl URL'yi belirtin
                    </p>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Etiketler
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-beige)] text-[var(--color-charcoal)] rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Etiket ekle..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                      />
                      <Button type="button" variant="outline" onClick={handleAddTag}>
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Teknik Özellikler
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleAddSpecification}
                        leftIcon={<Plus className="w-4 h-4" />}
                      >
                        Ekle
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                            placeholder="Özellik (örn: Sayfa Sayısı)"
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                            placeholder="Değer (örn: 52)"
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecification(index)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {formData.specifications.length === 0 && (
                        <p className="text-gray-400 text-sm text-center py-4">
                          Henüz teknik özellik eklenmedi
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Yayın Durumu</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="draft">Taslak</option>
                  <option value="active">Yayında</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-gray-700">Öne Çıkan Ürün</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <span className="text-sm text-gray-700">Yeni Ürün Etiketi</span>
                </label>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Hızlı İpuçları</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Yüksek kaliteli görseller kullanın (min. 800x800px)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                SEO başlığını 50-60 karakter arasında tutun
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Açıklamalarda anahtar kelimeleri kullanın
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Stok bilgisini güncel tutun
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

