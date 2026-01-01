import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  subcategory?: string;
  stock: number;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  specifications: Map<string, string>;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Ürün adı gereklidir'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Ürün açıklaması gereklidir'],
    },
    shortDescription: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Ürün fiyatı gereklidir'],
      min: [0, 'Fiyat negatif olamaz'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'İndirimli fiyat negatif olamaz'],
    },
    images: [{
      type: String,
    }],
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Kategori gereklidir'],
    },
    subcategory: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stok negatif olamaz'],
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    tags: [{
      type: String,
    }],
    specifications: {
      type: Map,
      of: String,
    },
    weight: {
      type: Number,
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9ğüşıöç]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for search
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

