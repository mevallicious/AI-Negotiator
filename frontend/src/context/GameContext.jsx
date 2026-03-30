import { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [patience, setPatience] = useState(20);
    const [status, setStatus] = useState('ongoing'); 

    const resetGame = () => {
        setSession(null);
        setMessages([]);
        setPatience(20);
        setStatus('ongoing');
    };

    return (
        <GameContext.Provider value={{ 
        session, setSession, 
        messages, setMessages, 
        patience, setPatience, 
        status, setStatus,
        resetGame 
        }}>
        {children}
        </GameContext.Provider>
    );
};