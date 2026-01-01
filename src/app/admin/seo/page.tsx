'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Save,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  RefreshCw,
  FileText,
  Link2,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SEOSettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // General
    siteName: 'Apeirona',
    siteTagline: 'Sınırsız Sanat | Planlayıcı & Kırtasiye',
    siteDescription: 'Kendi planlayıcınızı tasarlayın! Kaliteli planlayıcı defterler, ajandalar, bullet journal ve kırtasiye ürünleri. Türkiye\'nin en yaratıcı kırtasiye markası.',
    siteKeywords: 'planlayıcı, ajanda, defter, bullet journal, kırtasiye, haftalık planlayıcı, günlük planlayıcı',
    
    // Social
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@apeirona',
    facebookAppId: '',
    instagramHandle: '@apeirona',
    
    // Analytics
    gaId: '',
    gtmId: '',
    fbPixelId: '',
    pinterestTagId: '',
    tiktokPixelId: '',
    
    // Verification
    googleVerification: '',
    bingVerification: '',
    yandexVerification: '',
    pinterestVerification: '',
    
    // Advanced
    robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /hesabim/
Disallow: /odeme/

Sitemap: https://apeirona.com/sitemap.xml`,
    customHeadCode: '',
    customBodyCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const seoScore = 85; // Calculate based on filled fields

  const sections = [
    { id: 'general', label: 'Genel SEO', icon: Globe },
    { id: 'social', label: 'Sosyal Medya', icon: Facebook },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'verification', label: 'Doğrulama', icon: CheckCircle },
    { id: 'advanced', label: 'Gelişmiş', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO & Pazarlama Ayarları</h1>
          <p className="text-gray-500">Arama motoru optimizasyonu ve pazarlama araçları</p>
        </div>
        <Button
          variant="primary"
          leftIcon={saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>

      {/* SEO Score */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">SEO Puanı</h2>
          <span className="text-3xl font-bold text-green-600">{seoScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${seoScore}%` }}
            className={`h-3 rounded-full ${
              seoScore >= 80 ? 'bg-green-500' :
              seoScore >= 60 ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { label: 'Meta Açıklamaları', status: 'good' },
            { label: 'Sosyal Medya', status: 'good' },
            { label: 'Analytics', status: 'warning' },
            { label: 'Yapılandırılmış Veri', status: 'good' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              {item.status === 'good' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : item.status === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors
                    ${activeSection === section.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* General SEO */}
          {activeSection === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                Genel SEO Ayarları
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Sloganı
                  </label>
                  <input
                    type="text"
                    name="siteTagline"
                    value={formData.siteTagline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Açıklaması (Meta Description)
                </label>
                <textarea
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={160}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                />
                <p className="text-sm text-gray-400 mt-1">
                  {formData.siteDescription.length}/160 karakter
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anahtar Kelimeler
                </label>
                <input
                  type="text"
                  name="siteKeywords"
                  value={formData.siteKeywords}
                  onChange={handleInputChange}
                  placeholder="Virgülle ayırarak yazın"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Google Preview */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Google Arama Önizlemesi
                </h4>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-green-700 text-sm">apeirona.com</p>
                  <h5 className="text-xl text-blue-800 font-medium mt-1 hover:underline cursor-pointer">
                    {formData.siteName} - {formData.siteTagline}
                  </h5>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {formData.siteDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Media */}
          {activeSection === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Facebook className="w-5 h-5 text-[var(--color-primary)]" />
                Sosyal Medya Ayarları
              </h2>

              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  Open Graph ve Twitter Card etiketleri, içeriğiniz sosyal medyada paylaşıldığında nasıl görüneceğini kontrol eder.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varsayılan Paylaşım Görseli (OG Image)
                </label>
                <div className="flex gap-4">
                  <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={formData.ogImage || '/placeholder-og.jpg'}
                      alt="OG Image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="ogImage"
                      value={formData.ogImage}
                      onChange={handleInputChange}
                      placeholder="/images/og-image.jpg"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <p className="text-sm text-gray-400 mt-1">
                      Önerilen boyut: 1200x630 piksel
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Twitter className="w-4 h-4 inline mr-2" />
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleInputChange}
                    placeholder="@kullaniciadi"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    name="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={handleInputChange}
                    placeholder="@kullaniciadi"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Facebook className="w-4 h-4 inline mr-2" />
                  Facebook App ID
                </label>
                <input
                  type="text"
                  name="facebookAppId"
                  value={formData.facebookAppId}
                  onChange={handleInputChange}
                  placeholder="123456789012345"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                />
                <p className="text-sm text-gray-400 mt-1">
                  <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    Facebook Developers'dan alabilirsiniz <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </motion.div>
          )}

          {/* Analytics */}
          {activeSection === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
                Analytics & Tracking
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Google Analytics */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Google Analytics 4</h3>
                      <p className="text-sm text-gray-500">Ziyaretçi analizi</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="gaId"
                    value={formData.gaId}
                    onChange={handleInputChange}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* Google Tag Manager */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Google Tag Manager</h3>
                      <p className="text-sm text-gray-500">Etiket yönetimi</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="gtmId"
                    value={formData.gtmId}
                    onChange={handleInputChange}
                    placeholder="GTM-XXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* Facebook Pixel */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Facebook className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Meta Pixel</h3>
                      <p className="text-sm text-gray-500">Facebook & Instagram</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="fbPixelId"
                    value={formData.fbPixelId}
                    onChange={handleInputChange}
                    placeholder="123456789012345"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* Pinterest Tag */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Pinterest Tag</h3>
                      <p className="text-sm text-gray-500">Pinterest tracking</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="pinterestTagId"
                    value={formData.pinterestTagId}
                    onChange={handleInputChange}
                    placeholder="1234567890123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* TikTok Pixel */}
                <div className="p-4 border border-gray-200 rounded-xl md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">TikTok Pixel</h3>
                      <p className="text-sm text-gray-500">TikTok Ads tracking</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="tiktokPixelId"
                    value={formData.tiktokPixelId}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXXXXXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Verification */}
          {activeSection === 'verification' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--color-primary)]" />
                Site Doğrulama Kodları
              </h2>

              <div className="p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  Arama motorları ve sosyal medya platformları sitenizin size ait olduğunu doğrulamak için meta etiketleri kullanır.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Search Console
                  </label>
                  <input
                    type="text"
                    name="googleVerification"
                    value={formData.googleVerification}
                    onChange={handleInputChange}
                    placeholder="google-site-verification=..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bing Webmaster
                  </label>
                  <input
                    type="text"
                    name="bingVerification"
                    value={formData.bingVerification}
                    onChange={handleInputChange}
                    placeholder="msvalidate.01=..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yandex Webmaster
                  </label>
                  <input
                    type="text"
                    name="yandexVerification"
                    value={formData.yandexVerification}
                    onChange={handleInputChange}
                    placeholder="yandex-verification=..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pinterest
                  </label>
                  <input
                    type="text"
                    name="pinterestVerification"
                    value={formData.pinterestVerification}
                    onChange={handleInputChange}
                    placeholder="p:domain_verify=..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Advanced */}
          {activeSection === 'advanced' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                Gelişmiş Ayarlar
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  robots.txt İçeriği
                </label>
                <textarea
                  name="robotsTxt"
                  value={formData.robotsTxt}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özel &lt;head&gt; Kodu
                </label>
                <textarea
                  name="customHeadCode"
                  value={formData.customHeadCode}
                  onChange={handleInputChange}
                  placeholder="<!-- Özel meta etiketleri veya scriptler -->"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono text-sm"
                />
                <p className="text-sm text-gray-400 mt-1">
                  &lt;head&gt; etiketinin içine eklenecek özel kod
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özel &lt;body&gt; Kodu
                </label>
                <textarea
                  name="customBodyCode"
                  value={formData.customBodyCode}
                  onChange={handleInputChange}
                  placeholder="<!-- Chat widget veya başka scriptler -->"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono text-sm"
                />
                <p className="text-sm text-gray-400 mt-1">
                  &lt;body&gt; etiketinin sonuna eklenecek özel kod
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

