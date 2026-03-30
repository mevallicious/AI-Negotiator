import express from 'express';
import { startGame, processBid } from '../controllers/game.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/game/start
 * @desc    Initialize a new negotiation with a specific persona
 * @access  Private
 * @body    { "difficulty": "easy" | "medium" | "hard" }
 */
router.post('/start', protect, startGame);

/**
 * @route   POST /api/game/bid
 * @desc    Send a message and a bid to the AI seller
 * @access  Private
 * @body    { "sessionId": "...", "message": "...", "bidAmount": 500 }
 */
router.post('/bid', protect, processBid);

export default router;