'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    personalization: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setPreferences(allPreferences);
    setShowBanner(false);
    
    // Enable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      });
    }
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);

    // Update consent based on selections
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
      });
    }
  };

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(minimalPreferences));
    setPreferences(minimalPreferences);
    setShowBanner(false);
  };

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Zorunlu Çerezler',
      description: 'Site işlevselliği için gerekli çerezler. Devre dışı bırakılamaz.',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Analitik Çerezler',
      description: 'Ziyaretçi davranışlarını anlamamıza yardımcı olur.',
      required: false,
    },
    {
      id: 'marketing',
      name: 'Pazarlama Çerezleri',
      description: 'Kişiselleştirilmiş reklamlar için kullanılır.',
      required: false,
    },
    {
      id: 'personalization',
      name: 'Kişiselleştirme Çerezleri',
      description: 'Tercihlerinizi hatırlamak için kullanılır.',
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop for settings modal */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
          )}

          {/* Main Banner */}
          {!showSettings && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
            >
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-beige)] rounded-full flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        Çerez Kullanımı 🍪
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Size en iyi deneyimi sunmak için çerezleri kullanıyoruz. Çerezler, siteyi geliştirmemize,
                        içerikleri kişiselleştirmemize ve size özel reklamlar göstermemize yardımcı olur.{' '}
                        <Link href="/gizlilik-politikasi" className="text-[var(--color-primary)] hover:underline">
                          Gizlilik Politikamızı
                        </Link>{' '}
                        okuyabilirsiniz.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-none px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                      Tümünü Kabul Et
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 sm:flex-none px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Tercihler
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 sm:flex-none px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Sadece Zorunlu
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Modal */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[70] bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="font-semibold text-lg">Çerez Tercihleri</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {cookieTypes.map((cookie) => (
                  <div
                    key={cookie.id}
                    className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{cookie.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{cookie.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[cookie.id as keyof typeof preferences]}
                        onChange={(e) => {
                          if (!cookie.required) {
                            setPreferences({
                              ...preferences,
                              [cookie.id]: e.target.checked,
                            });
                          }
                        }}
                        disabled={cookie.required}
                        className="sr-only peer"
                      />
                      <div className={`
                        w-11 h-6 rounded-full peer transition-colors
                        ${cookie.required
                          ? 'bg-green-500 cursor-not-allowed'
                          : 'bg-gray-200 peer-checked:bg-[var(--color-primary)]'
                        }
                        peer-focus:outline-none
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:after:translate-x-full
                      `}>
                        {cookie.required && (
                          <Check className="w-4 h-4 text-white absolute top-1 left-1.5" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Seçilenleri Kaydet
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Tümünü Kabul Et
                </button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default CookieConsent;

