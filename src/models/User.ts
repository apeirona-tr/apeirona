import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAddress {
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

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone?: string;
  addresses: IAddress[];
  role: 'customer' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AddressSchema = new Schema<IAddress>({
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  neighborhood: { type: String, required: true },
  addressLine: { type: String, required: true },
  postalCode: { type: String },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email gereklidir'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Şifre gereklidir'],
      minlength: [6, 'Şifre en az 6 karakter olmalıdır'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'İsim gereklidir'],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, 'Soyisim gereklidir'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    addresses: [AddressSchema],
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

