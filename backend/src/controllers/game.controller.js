import GameSession from '../models/game.model.js';
import Score from '../models/score.model.js'; 
import { getAIResponse } from '../services/mistralService.js';
import { getPersona } from '../services/personaService.js'


export const startGame = async (req, res) => {
  const { difficulty } = req.body; 
  try {

    const persona = getPersona(difficulty);

    const session = await GameSession.create({
      userId: req.user._id, 
      sellerName: persona.name,
      productName: persona.product,
      initialPrice: persona.initialPrice,
      currentPrice: persona.initialPrice,
      minPrice: persona.minPrice,
      traits: persona.traits,
      patience: persona.patience,
      difficulty: persona.difficulty,
      status: 'ongoing',
      history: []
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Start Game Error:", error);
    res.status(500).json({ error: "Failed to start the haggle!" });
  }
};

// 💰 PROCESS BID
export const processBid = async (req, res) => {
  const { sessionId, message, bidAmount } = req.body;

  try {
    const session = await GameSession.findById(sessionId);
    if (!session || session.status !== 'ongoing') {
        return res.status(400).json({ msg: "Game session invalid or ended." });
    }

    const bid = Number(bidAmount);
    let patiencePenalty = 0;

    // Difficulty logic stays here because it's part of the game "rules"
    if (session.difficulty === 'Hard') {
      if (bid < session.currentPrice * 0.9) patiencePenalty = 3;
      else if (bid < session.currentPrice) patiencePenalty = 1;
    } else if (session.difficulty === 'Medium') {
      if (bid < session.currentPrice * 0.7) patiencePenalty = 2;
    } else {
      if (bid < session.currentPrice * 0.3) patiencePenalty = 1;
    }

    session.patience -= patiencePenalty;

   
    const reply = await getAIResponse(session, userMessage, bidAmount);

    if (reply.includes("DEAL!")) {
      session.status = 'completed';
      session.finalPrice = bid;

      const discount = ((session.initialPrice - bid) / session.initialPrice) * 100;
      
      await Score.create({
        userId: session.userId,
        username: req.user.username,
        productName: session.productName,
        finalPrice: bid,
        discountPercentage: discount.toFixed(2),
        rounds: (session.history.length / 2) + 1,
        rankTitle: getRankTitle(session.difficulty, discount)
      });
    } 
    else if (reply.includes("BYE BYE!") || session.patience <= 0) {
      session.status = 'failed';
    }

    session.currentPrice = bid; 
    session.history.push({ role: 'user', content: message });
    session.history.push({ role: 'assistant', content: reply });
    
    await session.save();

    res.json({ 
      reply, 
      status: session.status, 
      patience: session.patience,
      currentPrice: session.currentPrice 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper for the Leaderboard
const getRankTitle = (difficulty, discount) => {
  if (difficulty === 'Hard' && discount > 10) return "The Art of the Deal Master";
  if (difficulty === 'Easy' && discount > 50) return "Speedy Robbery";
  return "Negotiator";
};