import { createContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;

    // src/context/AuthContext.jsx

useEffect(() => {
    const verifyUser = async () => {
        try {
            const res = await getMe();
            console.log("🔍 AUTH CHECK RESPONSE:", res); // Check your browser console!

            // 🚨 Use this logic to catch the user object no matter the path
            const userData = res.data?.user || res.user || res.data;
            setUser(userData); 
        } catch (err) {
            console.error("❌ VERIFY FAILED:", err);
            setUser(null); 
        } finally {
            setLoading(false);
        }
    };
    verifyUser();
}, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading,isAuthenticated }}>
        {children}
        </AuthContext.Provider>
    );
};