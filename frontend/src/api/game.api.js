import api from './api';

export const startGameRequest = (difficulty) => api.post('/game/start', { difficulty });
export const processBidRequest = (sessionId, message, bidAmount) => 
  api.post('/game/bid', { sessionId, message, bidAmount });