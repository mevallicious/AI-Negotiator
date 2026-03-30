import Score from '../models/score.model.js';


export const getGlobalLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ discountPercentage: -1, rounds: 1 }) 
      .limit(10);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch the legends list!" });
  }
};


export const getMyScores = async (req, res) => {
  try {
    const myHistory = await Score.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(myHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve your deals, bro." });
  }
};