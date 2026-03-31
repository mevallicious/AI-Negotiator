import GameSession from '../models/game.model.js';
import Score from '../models/score.model.js'; 
import { getAIResponse } from '../services/mistralService.js'; // Note: Keeping name same but using Gemini inside
import { getPersona } from '../services/personaService.js';

// 🎮 START A NEW NEGOTIATION
export const startGame = async (req, res) => {
  const { difficulty } = req.body; 
  try {
    const persona = getPersona(difficulty);

    const session = await GameSession.create({
      userId: req.user._id, 
      sellerName: persona.name,
      productName: persona.product,
      tagline: persona.tagline, // 🚨 Ensure this is in your GameSession Schema!
      traits: persona.traits,   // 🚨 Ensure this is in your GameSession Schema!
      initialPrice: persona.initialPrice,
      currentPrice: persona.initialPrice,
      minPrice: persona.minPrice,
      patience: persona.patience,
      difficulty: persona.difficulty,
      status: 'ongoing',
      history: []
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("❌ Start Game Error:", error);
    res.status(500).json({ error: "Failed to start the haggle!" });
  }
};

// 💰 PROCESS A BID (THE MAIN ENGINE)
export const processBid = async (req, res) => {
  const { sessionId, message, bidAmount } = req.body;
  const bid = Number(bidAmount);

  console.log(`🔔 BID RECEIVED: $${bid} for session ${sessionId}`);

  try {
    // 1. Validation
    const session = await GameSession.findById(sessionId);
    if (!session || session.status !== 'ongoing') {
        return res.status(400).json({ msg: "Game session invalid or ended." });
    }

    // 2. Patience Penalty Logic (Rules of the Game)
    let patiencePenalty = 0;
    const diff = session.difficulty.toLowerCase();

    if (diff === 'hard') {
      if (bid < session.currentPrice * 0.9) patiencePenalty = 3;
      else if (bid < session.currentPrice) patiencePenalty = 1;
    } else if (diff === 'medium') {
      if (bid < session.currentPrice * 0.7) patiencePenalty = 2;
    } else {
      if (bid < session.currentPrice * 0.3) patiencePenalty = 1;
    }

    session.patience -= patiencePenalty;

    // 3. Get AI Response from Gemini
    const reply = await getAIResponse(session, message);

    // 4. Handle Deal or Failure (Case Insensitive!)
    const upperReply = reply.toUpperCase();

    if (upperReply.includes("DEAL!")) {
      session.status = 'completed';
      session.finalPrice = bid;

      // Calculate Savings Performance
      const discount = ((session.initialPrice - bid) / session.initialPrice) * 100;
      
      // Save to Global Leaderboard
      await Score.create({
        userId: session.userId,
        username: req.user.username,
        productName: session.productName,
        finalPrice: bid,
        discountPercentage: parseFloat(discount.toFixed(2)),
        rounds: (session.history.length / 2) + 1,
        rankTitle: getRankTitle(session.difficulty, discount)
      });
      console.log("🏆 SCORE SAVED TO LEADERBOARD");

    } else if (upperReply.includes("BYE BYE!") || session.patience <= 0) {
      session.status = 'failed';
    }

    // 5. Update Session State
    session.currentPrice = bid; 
    session.history.push({ role: 'user', content: message });
    session.history.push({ role: 'assistant', content: reply });
    
    await session.save();

    // 6. Send clean response back to React
    return res.json({
        reply: reply, // Matches the frontend's data.reply
        patience: session.patience,
        status: session.status,
        currentPrice: session.currentPrice
    });

  } catch (error) {
    console.error("❌ ProcessBid Error:", error.message);
    res.status(500).json({ error: "The AI is currently short-circuiting. Try again!" });
  }
};

// 🏅 HELPER: ASSIGN TITLES
const getRankTitle = (difficulty, discount) => {
  if (difficulty.toLowerCase() === 'hard' && discount > 15) return "The Art of the Deal Master";
  if (difficulty.toLowerCase() === 'easy' && discount > 50) return "Speedy Robbery";
  return "Negotiator";
};