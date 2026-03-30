import { useContext, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { fetchGlobalLeaderboard, fetchMyScores } from '../api/score.api';

export const useScore = () => {
    const { setLeaderboard, setMyScores } = useContext(ScoreContext);
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

    return { getLeaderboard, getPersonalScores, loading };
};