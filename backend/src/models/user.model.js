import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  createdAt: { type: Date, default: Date.now }
});


userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error("Password hashing failed: " + error.message);
  }
});

export const User = mongoose.model('User', userSchema);