// Analytics & Tracking Utilities

// Google Analytics 4
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Meta/Facebook Pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Pinterest Tag
export const PINTEREST_TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;

// TikTok Pixel
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

// ============ Google Analytics 4 ============

// Page view
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};

// GA4 Event
export const gaEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce Events for GA4
export const gaEcommerceEvents = {
  viewItem: (item: EcommerceItem) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'TRY',
        value: item.price,
        items: [item],
      });
    }
  },

  addToCart: (item: EcommerceItem) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'TRY',
        value: item.price * (item.quantity || 1),
        items: [item],
      });
    }
  },

  removeFromCart: (item: EcommerceItem) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        currency: 'TRY',
        value: item.price * (item.quantity || 1),
        items: [item],
      });
    }
  },

  viewCart: (items: EcommerceItem[], value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_cart', {
        currency: 'TRY',
        value,
        items,
      });
    }
  },

  beginCheckout: (items: EcommerceItem[], value: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'TRY',
        value,
        items,
      });
    }
  },

  addPaymentInfo: (items: EcommerceItem[], value: number, paymentType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_payment_info', {
        currency: 'TRY',
        value,
        payment_type: paymentType,
        items,
      });
    }
  },

  addShippingInfo: (items: EcommerceItem[], value: number, shippingTier: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_shipping_info', {
        currency: 'TRY',
        value,
        shipping_tier: shippingTier,
        items,
      });
    }
  },

  purchase: (transactionId: string, items: EcommerceItem[], value: number, shipping: number, tax: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        currency: 'TRY',
        value,
        shipping,
        tax,
        items,
      });
    }
  },

  search: (searchTerm: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
      });
    }
  },

  viewItemList: (listId: string, listName: string, items: EcommerceItem[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_id: listId,
        item_list_name: listName,
        items,
      });
    }
  },

  selectItem: (listId: string, listName: string, item: EcommerceItem) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_item', {
        item_list_id: listId,
        item_list_name: listName,
        items: [item],
      });
    }
  },
};

// ============ Meta/Facebook Pixel ============

export const fbPixelEvents = {
  pageView: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  },

  viewContent: (contentId: string, contentName: string, contentCategory: string, value: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_ids: [contentId],
        content_name: contentName,
        content_category: contentCategory,
        content_type: 'product',
        value,
        currency: 'TRY',
      });
    }
  },

  addToCart: (contentId: string, contentName: string, value: number, quantity: number = 1) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: [contentId],
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'TRY',
        quantity,
      });
    }
  },

  initiateCheckout: (contentIds: string[], value: number, numItems: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: contentIds,
        content_type: 'product',
        value,
        currency: 'TRY',
        num_items: numItems,
      });
    }
  },

  addPaymentInfo: () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddPaymentInfo');
    }
  },

  purchase: (contentIds: string[], value: number, numItems: number, orderId?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        content_ids: contentIds,
        content_type: 'product',
        value,
        currency: 'TRY',
        num_items: numItems,
        ...(orderId && { order_id: orderId }),
      });
    }
  },

  search: (searchString: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchString,
      });
    }
  },

  completeRegistration: (method?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        ...(method && { registration_method: method }),
      });
    }
  },

  lead: (contentName?: string) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        ...(contentName && { content_name: contentName }),
      });
    }
  },

  addToWishlist: (contentId: string, contentName: string, value: number) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToWishlist', {
        content_ids: [contentId],
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'TRY',
      });
    }
  },

  customEvent: (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, params);
    }
  },
};

// ============ Pinterest Tag ============

export const pinterestEvents = {
  pageVisit: () => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'pagevisit');
    }
  },

  viewCategory: (categoryName: string) => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'viewcategory', {
        category: categoryName,
      });
    }
  },

  search: (searchQuery: string) => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'search', {
        search_query: searchQuery,
      });
    }
  },

  addToCart: (productId: string, productName: string, value: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'addtocart', {
        product_id: productId,
        product_name: productName,
        value,
        order_quantity: quantity,
        currency: 'TRY',
      });
    }
  },

  checkout: (value: number, orderQuantity: number, productIds: string[]) => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'checkout', {
        value,
        order_quantity: orderQuantity,
        currency: 'TRY',
        line_items: productIds.map(id => ({ product_id: id })),
      });
    }
  },

  signup: () => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'signup');
    }
  },

  lead: (leadType?: string) => {
    if (typeof window !== 'undefined' && window.pintrk) {
      window.pintrk('track', 'lead', {
        ...(leadType && { lead_type: leadType }),
      });
    }
  },
};

// ============ TikTok Pixel ============

export const tiktokEvents = {
  pageView: () => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('ViewContent');
    }
  },

  viewContent: (contentId: string, contentName: string, value: number) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('ViewContent', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'TRY',
      });
    }
  },

  addToCart: (contentId: string, contentName: string, value: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('AddToCart', {
        content_id: contentId,
        content_name: contentName,
        content_type: 'product',
        value,
        currency: 'TRY',
        quantity,
      });
    }
  },

  initiateCheckout: (value: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('InitiateCheckout', {
        value,
        currency: 'TRY',
        quantity,
      });
    }
  },

  completePayment: (value: number, quantity: number, contentId?: string) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('CompletePayment', {
        value,
        currency: 'TRY',
        quantity,
        ...(contentId && { content_id: contentId }),
      });
    }
  },

  placeOrder: (value: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('PlaceAnOrder', {
        value,
        currency: 'TRY',
        quantity,
      });
    }
  },

  search: (query: string) => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('Search', {
        query,
      });
    }
  },

  completeRegistration: () => {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('CompleteRegistration');
    }
  },
};

// ============ Types ============

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price: number;
  quantity?: number;
}

// ============ Global Window Type Declarations ============

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
    fbq: (
      command: 'track' | 'trackCustom' | 'init',
      eventName: string,
      params?: Record<string, any>
    ) => void;
    pintrk: (
      command: 'track' | 'load' | 'page',
      eventName?: string,
      params?: Record<string, any>
    ) => void;
    ttq: {
      track: (eventName: string, params?: Record<string, any>) => void;
      page: () => void;
      identify: (params: Record<string, any>) => void;
    };
  }
}

export {};

