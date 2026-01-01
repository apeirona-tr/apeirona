// User Types
export interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  phone?: string;
  address?: Address[];
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  _id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  addressLine: string;
  postalCode?: string;
  isDefault: boolean;
}

// Product Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  specifications: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  isActive: boolean;
  order: number;
}

// Custom Planner Types
export interface PlannerOption {
  _id: string;
  type: 'notebook_type' | 'inner_design' | 'cover_model' | 'spiral_type' | 'spiral_color' | 'packaging';
  name: string;
  description?: string;
  image?: string;
  price: number;
  isActive: boolean;
  order: number;
}

export interface CustomPlanner {
  notebookType: PlannerOption;
  innerDesign: PlannerOption;
  coverModel: PlannerOption;
  spiralType: PlannerOption;
  spiralColor: PlannerOption;
  packaging: PlannerOption;
  totalPrice: number;
}

// Cart Types
export interface CartItem {
  product?: Product;
  customPlanner?: CustomPlanner;
  quantity: number;
  isCustom: boolean;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Order Types
export interface Order {
  _id: string;
  orderNumber: string;
  user: string | User;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'iyzico' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingCost: number;
  totalAmount: number;
  notes?: string;
  trackingNumber?: string;
  iyzicoPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product?: Product;
  customPlanner?: CustomPlanner;
  quantity: number;
  price: number;
  isCustom: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

