import { useContext, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { fetchGlobalLeaderboard, fetchMyScores } from '../api/score.api';

export const useScore = () => {
    // 🚨 FIX 1: We need to get the data variables out of context too!
    const { leaderboard, setLeaderboard, myScores, setMyScores } = useContext(ScoreContext);
    const [loading, setLoading] = useState(false);

    const getLeaderboard = async () => {
        setLoading(true);
        try {
            const { data } = await fetchGlobalLeaderboard();
            setLeaderboard(data);
        } catch (err) {
            console.error("Could not fetch the legends list.", err);
        } finally {
            setLoading(false);
        }
    };

    const getPersonalScores = async () => {
        setLoading(true);
        try {
            const { data } = await fetchMyScores();
            setMyScores(data);
        } catch (err) {
            console.error("Could not fetch your trophies.", err);
        } finally {
            setLoading(false);
        }
    };

    // 🚨 FIX 2: Return 'leaderboard' and 'myScores' so the Page can use them!
    return { 
        leaderboard, 
        myScores, 
        getLeaderboard, 
        getPersonalScores, 
        loading 
    };
};