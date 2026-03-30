import express from 'express';
import { getGlobalLeaderboard, getMyScores } from '../controllers/score.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public: Anyone can see the top 10
router.get('/leaderboard', getGlobalLeaderboard);

// Private: Only the logged-in user can see their own history
router.get('/my-scores', protect, getMyScores);

export default router;