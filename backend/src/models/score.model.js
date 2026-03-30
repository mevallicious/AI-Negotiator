import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  productName: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, required: true }, // (Initial - Final) / Initial * 100
  rounds: { type: Number, required: true },
  rankTitle: { type: String } // e.g., "The Charmer", "Lowball King"
}, { timestamps: true });

export default mongoose.model('Score', scoreSchema);