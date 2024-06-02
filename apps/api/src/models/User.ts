import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  age?: number;
  gender?: string;
  location: {
    type: { type: string, enum: ['Point'], default: 'Point' },
    coordinates: { type: [number], required: true } // [longitude, latitude]
  };
  searchRadius: number;
  preferences?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  phone?: string;
  otp?: string;
  otpExpiry?: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: String,
  bio: String,
  age: Number,
  gender: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number]}
  },
  searchRadius: { type: Number, default: 50 }, // default radius in km
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'Preferences'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  phone: { type: String, unique: true },
  otp: String,
  otpExpiry: Date
}, {
  collection: 'Users'
});

userSchema.index({ location: '2dsphere' });

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
      if (err) throw new Error(err);
      this.password = hash;
      next();
    });
  } catch (error) {
    next(error);
  }
});

export default model<IUser>('User', userSchema);
