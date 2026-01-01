'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileSpreadsheet,
  FileJson,
  Download,
  AlertCircle,
  CheckCircle,
  X,
  ArrowLeft,
  Info
} from 'lucide-react';
import Link from 'next/link';

type ImportMode = 'append' | 'replace' | 'skip';

interface ImportResult {
  imported: number;
  updated: number;
  failed: number;
  errors: string[];
}

export default function ProductImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<ImportMode>('append');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/json' || droppedFile.name.endsWith('.json')) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Sadece JSON dosyaları desteklenmektedir.');
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/json' || selectedFile.name.endsWith('.json')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Sadece JSON dosyaları desteklenmektedir.');
      }
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const content = await file.text();
      const data = JSON.parse(content);

      // Dosya formatını kontrol et
      let products = [];
      if (Array.isArray(data)) {
        products = data;
      } else if (data.products && Array.isArray(data.products)) {
        products = data.products;
      } else {
        throw new Error('Geçersiz dosya formatı. Ürün listesi bulunamadı.');
      }

      const response = await fetch('/api/products/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products, mode }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Import işlemi başarısız');
      }

      setResult(responseData.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      products: [
        {
          name: 'Örnek Ürün',
          sku: 'APR-XXX-001',
          category: 'Planlayıcı Defterler',
          price: 149,
          compareAtPrice: 199,
          description: 'Ürün açıklaması buraya gelecek',
          shortDescription: 'Kısa açıklama',
          stock: 100,
          isActive: true,
          isFeatured: false,
          isNew: true,
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg'
          ],
          tags: ['etiket1', 'etiket2'],
          specifications: [
            { key: 'Boyut', value: 'A5' },
            { key: 'Sayfa Sayısı', value: '160' }
          ]
        }
      ]
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urun-sablonu.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportProducts = async () => {
    try {
      const response = await fetch('/api/products/import?format=json');
      const data = await response.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mevcut-urunler.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Ürünler dışa aktarılırken hata oluştu.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/urunler"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün İçe Aktar</h1>
          <p className="text-gray-500">JSON dosyasından toplu ürün ekleyin</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drop Zone */}
          <div
            className={`
              bg-white rounded-2xl shadow-sm p-8
              border-2 border-dashed transition-colors
              ${dragActive ? 'border-[var(--color-primary)] bg-[var(--color-beige)]' : 'border-gray-200'}
              ${file ? 'border-green-500' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              {file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <FileJson className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Dosyayı Kaldır
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      JSON dosyasını buraya sürükleyin
                    </p>
                    <p className="text-sm text-gray-500">veya</p>
                  </div>
                  <label className="inline-block">
                    <span className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors">
                      Dosya Seç
                    </span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Import Mode */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">İçe Aktarma Modu</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="mode"
                  value="append"
                  checked={mode === 'append'}
                  onChange={() => setMode('append')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">Ekle ve Güncelle</p>
                  <p className="text-sm text-gray-500">
                    Yeni ürünleri ekler, aynı SKU'ya sahip ürünleri günceller.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="mode"
                  value="skip"
                  checked={mode === 'skip'}
                  onChange={() => setMode('skip')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-gray-900">Sadece Yeni Ekle</p>
                  <p className="text-sm text-gray-500">
                    Yeni ürünleri ekler, mevcut SKU'ları atlar.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-red-200 rounded-xl cursor-pointer hover:bg-red-50 transition-colors">
                <input
                  type="radio"
                  name="mode"
                  value="replace"
                  checked={mode === 'replace'}
                  onChange={() => setMode('replace')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-red-600">Tümünü Değiştir</p>
                  <p className="text-sm text-gray-500">
                    ⚠️ Tüm mevcut ürünleri siler ve yenilerini ekler.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Hata</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Success Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 text-lg">
                    İçe Aktarma Tamamlandı!
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">{result.imported}</p>
                      <p className="text-sm text-gray-600">Yeni Eklendi</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{result.updated}</p>
                      <p className="text-sm text-gray-600">Güncellendi</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                      <p className="text-sm text-gray-600">Başarısız</p>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <div className="mt-4 bg-red-50 rounded-lg p-4">
                      <p className="font-medium text-red-800 mb-2">Hatalar:</p>
                      <ul className="text-sm text-red-600 space-y-1">
                        {result.errors.slice(0, 5).map((err, i) => (
                          <li key={i}>• {err}</li>
                        ))}
                        {result.errors.length > 5 && (
                          <li>... ve {result.errors.length - 5} hata daha</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Import Button */}
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className={`
              w-full py-4 rounded-xl font-medium text-white
              transition-all flex items-center justify-center gap-2
              ${file && !loading
                ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                İçe Aktarılıyor...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Ürünleri İçe Aktar
              </>
            )}
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
            <div className="space-y-3">
              <button
                onClick={downloadTemplate}
                className="w-full flex items-center gap-3 p-4 bg-[var(--color-beige)] rounded-xl hover:bg-[var(--color-sand)] transition-colors text-left"
              >
                <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                  <FileJson className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Şablon İndir</p>
                  <p className="text-xs text-gray-500">JSON formatı</p>
                </div>
              </button>

              <button
                onClick={exportProducts}
                className="w-full flex items-center gap-3 p-4 bg-[var(--color-beige)] rounded-xl hover:bg-[var(--color-sand)] transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ürünleri Dışa Aktar</p>
                  <p className="text-xs text-gray-500">Mevcut ürünleri indir</p>
                </div>
              </button>
            </div>
          </div>

          {/* Help */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">JSON Formatı</h3>
                <p className="text-sm text-blue-700 mt-2">
                  Dosyanız aşağıdaki formatta olmalıdır:
                </p>
                <pre className="mt-3 bg-white rounded-lg p-3 text-xs overflow-x-auto">
{`{
  "products": [
    {
      "name": "Ürün Adı",
      "sku": "APR-XXX-001",
      "category": "Kategori",
      "price": 149,
      "stock": 100,
      ...
    }
  ]
}`}
                </pre>
                <p className="text-sm text-blue-700 mt-3">
                  Detaylı format için şablonu indirin.
                </p>
              </div>
            </div>
          </div>

          {/* Required Fields */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Zorunlu Alanlar</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">name</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">sku</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">category</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">price</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <code className="bg-gray-100 px-2 py-0.5 rounded">description</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

