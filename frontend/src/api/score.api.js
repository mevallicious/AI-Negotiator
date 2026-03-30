import api from './api';

export const fetchGlobalLeaderboard = () => api.get('/score/leaderboard');
export const fetchMyScores = () => api.get('/score/my-scores');