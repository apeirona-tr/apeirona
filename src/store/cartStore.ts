import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlannerSelection {
  notebookType: { _id: string; name: string; price: number; image?: string } | null;
  innerDesign: { _id: string; name: string; price: number; image?: string } | null;
  coverModel: { _id: string; name: string; price: number; image?: string } | null;
  spiralType: { _id: string; name: string; price: number; image?: string } | null;
  spiralColor: { _id: string; name: string; price: number; image?: string } | null;
  packaging: { _id: string; name: string; price: number; image?: string } | null;
}

interface CartItem {
  id: string;
  productId?: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  isCustom: boolean;
  customPlanner?: PlannerSelection;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = item.isCustom 
          ? `custom-${Date.now()}` 
          : `product-${item.productId}`;
        
        set((state) => {
          // For regular products, check if already in cart
          if (!item.isCustom) {
            const existingItem = state.items.find(
              (i) => i.productId === item.productId && !i.isCustom
            );
            
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === existingItem.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              };
            }
          }
          
          // Add new item
          return {
            items: [...state.items, { ...item, id }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'apeirona-cart',
    }
  )
);

