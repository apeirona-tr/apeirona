'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Book,
  FileText,
  Palette,
  Link as LinkIcon,
  Circle,
  Gift,
  X,
  Save,
  ChevronDown,
  ChevronRight,
  Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const optionTypes = [
  { key: 'notebook_type', label: 'Defter Tipi', icon: Book, hasChildren: true },
  { key: 'inner_design', label: 'İç Tasarım', icon: FileText, hasChildren: false, parentKey: 'notebook_type' },
  { key: 'cover_model', label: 'Kapak Modeli', icon: Palette, hasChildren: false },
  { key: 'spiral_type', label: 'Spiral Tipi', icon: LinkIcon, hasChildren: false },
  { key: 'spiral_color', label: 'Spiral Rengi', icon: Circle, hasChildren: false },
  { key: 'packaging', label: 'Kutulama', icon: Gift, hasChildren: false },
];

interface PlannerOption {
  _id: string;
  name: string;
  description?: string;
  price: number;
  order: number;
  parentId?: string;
  childOptions?: PlannerOption[];
}

const demoOptions: Record<string, PlannerOption[]> = {
  notebook_type: [
    { 
      _id: 'nt1', 
      name: 'A5 - Spiralli Sert Karton Kapak', 
      description: '15x21cm (En çok satan ölçü)\n400gr. Bristol + Mat Selefon', 
      price: 0, 
      order: 1,
      childOptions: [
        { _id: 'id1', name: 'Günlük Planlayıcı Türkçe', price: 0, order: 1, parentId: 'nt1' },
        { _id: 'id2', name: 'Noktalı (Bullet)', price: 0, order: 2, parentId: 'nt1' },
        { _id: 'id3', name: 'Kareli', price: 0, order: 3, parentId: 'nt1' },
        { _id: 'id4', name: 'Çizgisiz', price: 0, order: 4, parentId: 'nt1' },
        { _id: 'id5', name: 'Haftalık Planlayıcı', price: 0, order: 5, parentId: 'nt1' },
        { _id: 'id6', name: 'Sınav Hazırlık Planlayıcı', price: 0, order: 6, parentId: 'nt1' },
        { _id: 'id7', name: 'Kitap Okuma Planlayıcı', price: 0, order: 7, parentId: 'nt1' },
        { _id: 'id8', name: 'Diyet ve Spor Planlayıcı', price: 0, order: 8, parentId: 'nt1' },
        { _id: 'id9', name: 'YDS Planlayıcı', price: 0, order: 9, parentId: 'nt1' },
        { _id: 'id10', name: 'Tarihsiz Ajanda', price: 0, order: 10, parentId: 'nt1' },
      ]
    },
    { 
      _id: 'nt2', 
      name: 'A5 - Tutkallı', 
      description: '15x21cm\nTutkallı cilt', 
      price: 0, 
      order: 2,
      childOptions: [
        { _id: 'id11', name: 'Çizgili', price: 0, order: 1, parentId: 'nt2' },
        { _id: 'id12', name: 'Kareli', price: 0, order: 2, parentId: 'nt2' },
        { _id: 'id13', name: 'Noktalı (Bullet)', price: 0, order: 3, parentId: 'nt2' },
        { _id: 'id14', name: 'Çizgisiz', price: 0, order: 4, parentId: 'nt2' },
      ]
    },
    { 
      _id: 'nt3', 
      name: 'A5 - Spiralli Plastik Kapak', 
      description: '15x21cm\nPlastik kapak', 
      price: -10, 
      order: 3,
      childOptions: [
        { _id: 'id15', name: 'Çizgili', price: 0, order: 1, parentId: 'nt3' },
        { _id: 'id16', name: 'Kareli', price: 0, order: 2, parentId: 'nt3' },
        { _id: 'id17', name: 'Noktalı (Bullet)', price: 0, order: 3, parentId: 'nt3' },
      ]
    },
    { 
      _id: 'nt4', 
      name: 'A6 - Spiralli Sert Karton Kapak', 
      description: '14x10cm\n400gr. Bristol + Mat Selefon', 
      price: -20, 
      order: 4,
      childOptions: [
        { _id: 'id18', name: 'Günlük Planlayıcı Türkçe', price: 0, order: 1, parentId: 'nt4' },
        { _id: 'id19', name: 'Noktalı (Bullet)', price: 0, order: 2, parentId: 'nt4' },
        { _id: 'id20', name: 'Çizgili', price: 0, order: 3, parentId: 'nt4' },
        { _id: 'id21', name: 'Tarihsiz Ajanda', price: 0, order: 4, parentId: 'nt4' },
      ]
    },
  ],
  inner_design: [], // Alt seçenekler notebook_type altında yönetiliyor
  cover_model: [
    { _id: 'cm1', name: 'Minimal Beyaz', description: 'Sade ve şık', price: 0, order: 1 },
    { _id: 'cm2', name: 'Kraft Kahverengi', description: 'Doğal görünüm', price: 0, order: 2 },
    { _id: 'cm3', name: 'Mermer Desen', description: 'Zarif mermer efekti', price: 20, order: 3 },
    { _id: 'cm4', name: 'Botanik', description: 'Bitki desenleri', price: 25, order: 4 },
    { _id: 'cm5', name: 'Geometrik', description: 'Modern geometrik desenler', price: 20, order: 5 },
    { _id: 'cm6', name: 'Deri Görünüm', description: 'Premium deri efekti', price: 40, order: 6 },
  ],
  spiral_type: [
    { _id: 'st1', name: 'Tel Spiral - Siyah', price: 0, order: 1 },
    { _id: 'st2', name: 'Tel Spiral - Beyaz', price: 0, order: 2 },
    { _id: 'st3', name: 'Tel Spiral - Gold', price: 15, order: 3 },
    { _id: 'st4', name: 'Tel Spiral - Rose Gold', price: 15, order: 4 },
  ],
  spiral_color: [
    { _id: 'sc1', name: 'Siyah', price: 0, order: 1 },
    { _id: 'sc2', name: 'Beyaz', price: 0, order: 2 },
    { _id: 'sc3', name: 'Altın', price: 15, order: 3 },
    { _id: 'sc4', name: 'Rose Gold', price: 15, order: 4 },
    { _id: 'sc5', name: 'Gümüş', price: 10, order: 5 },
  ],
  packaging: [
    { _id: 'pk1', name: 'Standart Paket', description: 'Zarif ambalaj kağıdı', price: 0, order: 1 },
    { _id: 'pk2', name: 'Hediye Kutusu', description: 'Özel hediye kutusu', price: 35, order: 2 },
    { _id: 'pk3', name: 'Premium Set', description: 'Kutu + Kurdele + Kart', price: 55, order: 3 },
  ],
};

export default function PlannerOptionsPage() {
  const [activeTab, setActiveTab] = useState('notebook_type');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<PlannerOption | null>(null);
  const [editingParent, setEditingParent] = useState<PlannerOption | null>(null);
  const [expandedOptions, setExpandedOptions] = useState<string[]>(['nt1']);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const handleOpenModal = (option?: PlannerOption) => {
    if (option) {
      setEditingOption(option);
      setFormData({
        name: option.name,
        description: option.description || '',
        price: option.price,
      });
    } else {
      setEditingOption(null);
      setFormData({ name: '', description: '', price: 0 });
    }
    setIsModalOpen(true);
  };

  const handleOpenChildModal = (parent: PlannerOption, child?: PlannerOption) => {
    setEditingParent(parent);
    if (child) {
      setEditingOption(child);
      setFormData({
        name: child.name,
        description: child.description || '',
        price: child.price,
      });
    } else {
      setEditingOption(null);
      setFormData({ name: '', description: '', price: 0 });
    }
    setIsChildModalOpen(true);
  };

  const handleSave = () => {
    console.log('Saving:', { ...formData, type: activeTab });
    setIsModalOpen(false);
    setIsChildModalOpen(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedOptions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const activeType = optionTypes.find((t) => t.key === activeTab);
  const options = demoOptions[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planlayıcı Seçenekleri</h1>
          <p className="text-gray-500">Özel planlayıcı oluşturma seçeneklerini yönetin</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-5 h-5" />}
          onClick={() => handleOpenModal()}
        >
          Yeni Seçenek
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Link2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Bağlı Seçenekler</p>
            <p className="text-sm text-blue-700">
              Defter Tipi seçeneklerine bağlı İç Tasarım seçenekleri ekleyebilirsiniz. 
              Müşteri bir defter tipi seçtiğinde, sadece o tipe uygun iç tasarım seçenekleri gösterilir.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 overflow-x-auto">
          <div className="flex">
            {optionTypes.filter(t => t.key !== 'inner_design').map((type) => (
              <button
                key={type.key}
                onClick={() => setActiveTab(type.key)}
                className={`
                  flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors
                  ${activeTab === type.key
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Options List */}
        <div className="p-6">
          <div className="space-y-3">
            {options.map((option, index) => {
              const isExpanded = expandedOptions.includes(option._id);
              const hasChildren = option.childOptions && option.childOptions.length > 0;

              return (
                <div key={option._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl group transition-colors
                      ${hasChildren ? 'bg-[var(--color-beige)]' : 'bg-gray-50 hover:bg-gray-100'}
                    `}
                  >
                    <button className="cursor-grab text-gray-400 hover:text-gray-600">
                      <GripVertical className="w-5 h-5" />
                    </button>

                    {/* Expand button for items with children */}
                    {hasChildren && (
                      <button 
                        onClick={() => toggleExpand(option._id)}
                        className="p-1 hover:bg-white rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-[var(--color-primary)]" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    )}

                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {activeType && <activeType.icon className="w-6 h-6 text-[var(--color-primary)]" />}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{option.name}</h3>
                      {option.description && (
                        <p className="text-sm text-gray-500 whitespace-pre-line">{option.description}</p>
                      )}
                      {hasChildren && (
                        <p className="text-xs text-[var(--color-primary)] mt-1">
                          {option.childOptions?.length} iç tasarım seçeneği
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-medium ${
                          option.price > 0
                            ? 'text-[var(--color-accent)]'
                            : option.price < 0
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {option.price === 0
                          ? 'Dahil'
                          : option.price > 0
                          ? `+${option.price}₺`
                          : `${option.price}₺`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {hasChildren && (
                        <button
                          onClick={() => handleOpenChildModal(option)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="İç Tasarım Ekle"
                        >
                          <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenModal(option)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Child Options */}
                  <AnimatePresence>
                    {hasChildren && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-16 mt-2 space-y-2"
                      >
                        {option.childOptions?.map((child, childIndex) => (
                          <motion.div
                            key={child._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: childIndex * 0.03 }}
                            className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100 group hover:border-[var(--color-primary)] transition-colors"
                          >
                            <button className="cursor-grab text-gray-300 hover:text-gray-500">
                              <GripVertical className="w-4 h-4" />
                            </button>

                            <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                              <FileText className="w-4 h-4 text-gray-400" />
                            </div>

                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-800">{child.name}</h4>
                              {child.description && (
                                <p className="text-xs text-gray-500">{child.description}</p>
                              )}
                            </div>

                            <span className={`text-sm font-medium ${
                              child.price > 0 ? 'text-[var(--color-accent)]' : 'text-gray-400'
                            }`}>
                              {child.price === 0 ? 'Dahil' : `+${child.price}₺`}
                            </span>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleOpenChildModal(option, child)}
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-500" />
                              </button>
                              <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </motion.div>
                        ))}

                        {/* Add Child Button */}
                        <button
                          onClick={() => handleOpenChildModal(option)}
                          className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm">İç Tasarım Ekle</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {options.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Henüz seçenek eklenmemiş</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleOpenModal()}
              >
                İlk Seçeneği Ekle
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Option Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {editingOption ? 'Seçeneği Düzenle' : 'Yeni Seçenek'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="İsim"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seçenek adı"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Kısa açıklama"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                </div>

                <Input
                  label="Fiyat Farkı (₺)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  helperText="0 = Dahil, Pozitif = Ek ücret, Negatif = İndirim"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<Save className="w-5 h-5" />}
                  onClick={handleSave}
                >
                  Kaydet
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Child Option Modal */}
      <AnimatePresence>
        {isChildModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChildModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {editingOption ? 'İç Tasarım Düzenle' : 'Yeni İç Tasarım'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Bağlı: <span className="font-medium text-[var(--color-primary)]">{editingParent?.name}</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsChildModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="İç Tasarım Adı"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: Günlük Planlayıcı Türkçe"
                />

                <Input
                  label="Açıklama (Opsiyonel)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kısa açıklama"
                />

                <Input
                  label="Fiyat Farkı (₺)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  helperText="0 = Dahil, Pozitif = Ek ücret"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setIsChildModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<Save className="w-5 h-5" />}
                  onClick={handleSave}
                >
                  Kaydet
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
