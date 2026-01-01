import mongoose, { Schema, Document } from 'mongoose';

interface IOrderAddress {
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  addressLine: string;
  postalCode?: string;
}

interface ICustomPlannerItem {
  notebookType: { name: string; price: number };
  innerDesign: { name: string; price: number };
  coverModel: { name: string; price: number };
  spiralType: { name: string; price: number };
  spiralColor: { name: string; price: number };
  packaging: { name: string; price: number };
}

interface IOrderItem {
  product?: mongoose.Types.ObjectId;
  productName: string;
  productImage?: string;
  customPlanner?: ICustomPlannerItem;
  quantity: number;
  price: number;
  isCustom: boolean;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IOrderAddress;
  billingAddress: IOrderAddress;
  paymentMethod: 'iyzico' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  notes?: string;
  trackingNumber?: string;
  iyzicoPaymentId?: string;
  iyzicoConversationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderAddressSchema = new Schema<IOrderAddress>({
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  neighborhood: { type: String, required: true },
  addressLine: { type: String, required: true },
  postalCode: { type: String },
}, { _id: false });

const CustomPlannerItemSchema = new Schema({
  notebookType: { name: String, price: Number },
  innerDesign: { name: String, price: Number },
  coverModel: { name: String, price: Number },
  spiralType: { name: String, price: Number },
  spiralColor: { name: String, price: Number },
  packaging: { name: String, price: Number },
}, { _id: false });

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  productImage: { type: String },
  customPlanner: CustomPlannerItemSchema,
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  isCustom: { type: Boolean, default: false },
}, { _id: false });

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [OrderItemSchema],
    shippingAddress: {
      type: OrderAddressSchema,
      required: true,
    },
    billingAddress: {
      type: OrderAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['iyzico', 'bank_transfer'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
    iyzicoPaymentId: {
      type: String,
    },
    iyzicoConversationId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number
OrderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `APR${year}${month}${day}${random}`;
  }
  next();
});

// Index for order queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ orderStatus: 1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

