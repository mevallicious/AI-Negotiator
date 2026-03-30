import { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const verifyUser = async () => {
        try {
            const res = await getMe();
            setUser(res.data.user); 
        } catch (err) {
            setUser(null); 
        } finally {
            setLoading(false);
        }
        };
        verifyUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
        </AuthContext.Provider>
    );
};