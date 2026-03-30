import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: { type: String, default: "Zappy the Robot" },
  productName: { type: String, default: "A Literal Moon Rock" },
  initialPrice: { type: Number, default: 1000 },
  currentPrice: { type: Number, default: 1000 },
  minPrice: { type: Number, default: 400 }, // The AI's secret limit
  patience: { type: Number, default: 10 },    // 10 = Happy, 0 = Rage Quit
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