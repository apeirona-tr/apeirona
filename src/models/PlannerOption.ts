import mongoose, { Schema, Document } from 'mongoose';

export type PlannerOptionType = 
  | 'notebook_type' 
  | 'inner_design' 
  | 'cover_model' 
  | 'spiral_type' 
  | 'spiral_color' 
  | 'packaging';

export interface IPlannerOption extends Document {
  type: PlannerOptionType;
  name: string;
  description?: string;
  image?: string;
  price: number;
  isActive: boolean;
  order: number;
  metadata?: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const PlannerOptionSchema = new Schema<IPlannerOption>(
  {
    type: {
      type: String,
      required: [true, 'Seçenek tipi gereklidir'],
      enum: ['notebook_type', 'inner_design', 'cover_model', 'spiral_type', 'spiral_color', 'packaging'],
    },
    name: {
      type: String,
      required: [true, 'Seçenek adı gereklidir'],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Fiyat negatif olamaz'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for type and order
PlannerOptionSchema.index({ type: 1, order: 1 });

export default mongoose.models.PlannerOption || 
  mongoose.model<IPlannerOption>('PlannerOption', PlannerOptionSchema);

