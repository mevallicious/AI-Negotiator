import { createContext, useState } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [myScores, setMyScores] = useState([]);

    return (
        <ScoreContext.Provider value={{ leaderboard, setLeaderboard, myScores, setMyScores }}>
        {children}
        </ScoreContext.Provider>
    );
};