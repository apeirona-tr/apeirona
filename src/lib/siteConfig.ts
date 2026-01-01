// Site genelinde kullanılan ayarlar
// Bu değerler admin panelinden MongoDB'ye kaydedilebilir veya env'den okunabilir

export const siteConfig = {
  // Kargo Ayarları
  shipping: {
    freeShippingThreshold: 500, // Ücretsiz kargo için minimum tutar (TL)
    standardShippingCost: 29.90, // Standart kargo ücreti (TL)
  },
  
  // Para Birimi
  currency: {
    code: 'TRY',
    symbol: '₺',
    locale: 'tr-TR',
  },
  
  // İletişim Bilgileri
  contact: {
    email: 'info@apeirona.com',
    phone: '+90 555 123 45 67',
    address: 'Kadıköy, İstanbul, Türkiye',
    instagram: 'https://instagram.com/apeirona',
  },
  
  // WhatsApp
  whatsapp: {
    number: '+905551234567',
    message: 'Merhaba, Apeirona hakkında bilgi almak istiyorum.',
  },
};

// Helper fonksiyon - para formatı
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat(siteConfig.currency.locale, {
    style: 'currency',
    currency: siteConfig.currency.code,
  }).format(price);
};

// Helper fonksiyon - kargo hesaplama
export const calculateShipping = (cartTotal: number): { cost: number; isFree: boolean; remaining: number } => {
  const { freeShippingThreshold, standardShippingCost } = siteConfig.shipping;
  const isFree = cartTotal >= freeShippingThreshold;
  
  return {
    cost: isFree ? 0 : standardShippingCost,
    isFree,
    remaining: isFree ? 0 : freeShippingThreshold - cartTotal,
  };
};

