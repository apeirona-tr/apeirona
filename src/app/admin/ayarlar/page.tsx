'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Store,
  Truck,
  CreditCard,
  Bell,
  Mail,
  Shield,
  Palette,
  Globe,
  Save,
  RefreshCw,
  Upload,
  Check,
  Info,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('store');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Store Info
    storeName: 'Apeirona',
    storeEmail: 'info@apeirona.com',
    storePhone: '+90 555 123 45 67',
    storeAddress: 'Kadıköy, İstanbul, Türkiye',
    storeLogo: '/images/logo.png',
    storeFavicon: '/favicon.ico',
    
    // Shipping
    freeShippingThreshold: 500,
    standardShippingCost: 29.90,
    expressShippingCost: 49.90,
    estimatedDeliveryDays: '2-3',
    
    // Payment
    iyzicoEnabled: true,
    iyzicoTestMode: true,
    bankTransferEnabled: true,
    cashOnDeliveryEnabled: false,
    
    // Notifications
    orderNotifications: true,
    stockAlertThreshold: 5,
    emailOrderConfirmation: true,
    emailShippingUpdate: true,
    
    // Social
    whatsappEnabled: true,
    whatsappNumber: '905551234567',
    whatsappMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
    
    // Theme
    primaryColor: '#8B7355',
    accentColor: '#C9A86C',
    enableDarkMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const sections = [
    { id: 'store', label: 'Mağaza Bilgileri', icon: Store },
    { id: 'shipping', label: 'Kargo Ayarları', icon: Truck },
    { id: 'payment', label: 'Ödeme Yöntemleri', icon: CreditCard },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'social', label: 'Sosyal Medya & İletişim', icon: Globe },
    { id: 'theme', label: 'Tema Ayarları', icon: Palette },
    { id: 'security', label: 'Güvenlik', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Ayarları</h1>
          <p className="text-gray-500">Mağaza ve sistem ayarlarını yönetin</p>
        </div>
        <Button
          variant="primary"
          leftIcon={saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
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
          {/* Store Settings */}
          {activeSection === 'store' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Store className="w-5 h-5 text-[var(--color-primary)]" />
                Mağaza Bilgileri
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mağaza Adı
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={formData.storeEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="text"
                    name="storePhone"
                    value={formData.storePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <input
                    type="text"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="storeLogo"
                      value={formData.storeLogo}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <Button variant="outline" leftIcon={<Upload className="w-5 h-5" />}>
                      Yükle
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    name="storeFavicon"
                    value={formData.storeFavicon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Shipping Settings */}
          {activeSection === 'shipping' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5 text-[var(--color-primary)]" />
                Kargo Ayarları
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ücretsiz Kargo Limiti (₺)
                  </label>
                  <input
                    type="number"
                    name="freeShippingThreshold"
                    value={formData.freeShippingThreshold}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Bu tutarın üzerindeki siparişlerde ücretsiz kargo
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahmini Teslimat Süresi
                  </label>
                  <input
                    type="text"
                    name="estimatedDeliveryDays"
                    value={formData.estimatedDeliveryDays}
                    onChange={handleInputChange}
                    placeholder="2-3"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    İş günü olarak
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standart Kargo Ücreti (₺)
                  </label>
                  <input
                    type="number"
                    name="standardShippingCost"
                    value={formData.standardShippingCost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Express Kargo Ücreti (₺)
                  </label>
                  <input
                    type="number"
                    name="expressShippingCost"
                    value={formData.expressShippingCost}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Settings */}
          {activeSection === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                Ödeme Yöntemleri
              </h2>

              <div className="space-y-4">
                {/* iyzico */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">iyzico</span>
                      </div>
                      <div>
                        <h3 className="font-medium">iyzico</h3>
                        <p className="text-sm text-gray-500">Kredi/Banka Kartı ile Ödeme</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="iyzicoEnabled"
                        checked={formData.iyzicoEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>
                  {formData.iyzicoEnabled && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="iyzicoTestMode"
                          checked={formData.iyzicoTestMode}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)]"
                        />
                        <span className="text-sm text-gray-700">Test Modu (Sandbox)</span>
                      </label>
                      <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                        <Info className="w-4 h-4" />
                        Test modunda gerçek ödeme alınmaz
                      </p>
                    </div>
                  )}
                </div>

                {/* Bank Transfer */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Havale/EFT</h3>
                        <p className="text-sm text-gray-500">Banka hesabına havale</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="bankTransferEnabled"
                        checked={formData.bankTransferEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Truck className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Kapıda Ödeme</h3>
                        <p className="text-sm text-gray-500">Teslimat anında ödeme</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="cashOnDeliveryEnabled"
                        checked={formData.cashOnDeliveryEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bell className="w-5 h-5 text-[var(--color-primary)]" />
                Bildirim Ayarları
              </h2>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">Yeni Sipariş Bildirimleri</h3>
                    <p className="text-sm text-gray-500">Yeni sipariş geldiğinde e-posta al</p>
                  </div>
                  <input
                    type="checkbox"
                    name="orderNotifications"
                    checked={formData.orderNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)]"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">Sipariş Onay E-postası</h3>
                    <p className="text-sm text-gray-500">Müşteriye sipariş onay maili gönder</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailOrderConfirmation"
                    checked={formData.emailOrderConfirmation}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)]"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">Kargo Güncelleme E-postası</h3>
                    <p className="text-sm text-gray-500">Kargo durumu değiştiğinde müşteriye bildir</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailShippingUpdate"
                    checked={formData.emailShippingUpdate}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)]"
                  />
                </label>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stok Uyarı Eşiği
                  </label>
                  <input
                    type="number"
                    name="stockAlertThreshold"
                    value={formData.stockAlertThreshold}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Stok bu sayının altına düştüğünde uyarı al
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social & Communication Settings */}
          {activeSection === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                Sosyal Medya & İletişim
              </h2>

              {/* WhatsApp Widget */}
              <div className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">WhatsApp Widget</h3>
                      <p className="text-sm text-gray-500">Sitede WhatsApp iletişim butonu göster</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="whatsappEnabled"
                      checked={formData.whatsappEnabled}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                {formData.whatsappEnabled && (
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp Numarası
                      </label>
                      <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="905551234567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        Ülke kodu ile birlikte, boşluk olmadan
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Varsayılan Mesaj
                      </label>
                      <textarea
                        name="whatsappMessage"
                        value={formData.whatsappMessage}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Theme Settings */}
          {activeSection === 'theme' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5 text-[var(--color-primary)]" />
                Tema Ayarları
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Renk
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      name="primaryColor"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vurgu Rengi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      name="accentColor"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium mb-3">Renk Önizleme</h4>
                <div className="flex gap-4">
                  <button
                    className="px-6 py-3 rounded-xl text-white font-medium"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Ana Buton
                  </button>
                  <button
                    className="px-6 py-3 rounded-xl text-white font-medium"
                    style={{ backgroundColor: formData.accentColor }}
                  >
                    Vurgu Butonu
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm space-y-6"
            >
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                Güvenlik Ayarları
              </h2>

              <div className="p-4 bg-green-50 rounded-xl flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">SSL Sertifikası Aktif</h4>
                  <p className="text-sm text-green-600">Siteniz HTTPS ile güvende</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <h4 className="font-medium mb-2">Admin Şifresini Değiştir</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Mevcut Şifre"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <input
                      type="password"
                      placeholder="Yeni Şifre"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <input
                      type="password"
                      placeholder="Yeni Şifre (Tekrar)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                    <Button variant="outline">Şifreyi Güncelle</Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-xl">
                  <h4 className="font-medium mb-2">İki Faktörlü Doğrulama</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Hesabınızı daha güvenli hale getirmek için 2FA'yı etkinleştirin
                  </p>
                  <Button variant="primary">2FA'yı Etkinleştir</Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

