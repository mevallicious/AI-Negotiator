import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, required: true },
  productName: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'easy', 'medium', 'hard'], required: true },
  traits: { type: String }, 
  tagline: { type: String },
  initialPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  minPrice: { type: Number, required: true }, 
  patience: { type: Number, default: 20 }, 
  
  history: [
    {
      role: { type: String, enum: ['user', 'assistant'] },
      content: String,
    }
  ],
  status: { type: String, enum: ['ongoing', 'completed', 'failed'], default: 'ongoing' },
  finalPrice: { type: Number, default: null }
}, { timestamps: true });

export default mongoose.model('GameSession', gameSessionSchema);