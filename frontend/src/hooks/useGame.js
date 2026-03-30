import { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { startGameRequest, processBidRequest } from '../api/game.api';

export const useGame = () => {
    const { 
        session, setSession, 
        messages, setMessages, 
        patience, setPatience, 
        status, setStatus, 
        resetGame 
    } = useContext(GameContext);
    
    const [loading, setLoading] = useState(false);

    const startNewGame = async (difficulty) => {
        setLoading(true);
        resetGame();
        try {
            const { data } = await startGameRequest(difficulty);
            // Handling the data structure from your alert
            const gameData = data.game || data; 
            
            setSession(gameData);
            setPatience(gameData.patience);
            setStatus(gameData.status);
            setMessages([{ 
                role: 'assistant', 
                content: `I am ${gameData.sellerName}. Let's negotiate!` 
            }]);
            return true; // Return true so the LandingPage knows to navigate
        } catch (err) {
            console.error("Start game failed", err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const sendBid = async (userMessage, bidAmount) => {
        const id = session?._id || session?.id;
        if (!id) return;
        
        setLoading(true);
        // Add user message to UI immediately
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

        try {
            const { data } = await processBidRequest(id, userMessage, bidAmount);
            
            // Once you fix the backend to use getAIResponse, 
            // it will return 'reply', 'patience', and 'status'.
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
            setPatience(data.patience);
            setStatus(data.status); 
            
            // If the backend updated the price, update it in the session too
            if (data.currentPrice) {
                setSession(prev => ({ ...prev, currentPrice: data.currentPrice }));
            }
        } catch (err) {
            const serverError = err.response?.data?.error || "The AI is thinking too hard. Try again!";
            console.error("Backend Glitch:", serverError);
        } finally {
            setLoading(false);
        }
    };

    // 🚨 ADDED THESE TO THE RETURN STATEMENT:
    return { 
        session, 
        messages, 
        patience, 
        status, 
        startNewGame, 
        sendBid, 
        loading 
    };
};