import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { register, login, logout } from "../api/auth.api";

export const useAuth = () => {
    // We only pull what actually exists in your new AuthContext
    const { user, setUser, loading } = useContext(AuthContext);

    const handleRegister = async (userData) => {
        try {
            const data = await register(userData);
            setUser(data.data.user || data.user); // Depends on your backend response structure
            return data;
        } catch (err) {
            throw err.response?.data?.error || "Registration failed";  
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials);
            setUser(data.data.user || data.user);
            return data; 
        } catch (err) {
            setUser(null);
            throw err.response?.data?.error || "Login failed. Check your credentials.";
        }
    };

    const handleLogOut = async () => {
        try {
            await logout();
            setUser(null); // Instantly clears the session on the frontend
        } catch (err) {
            console.error("Logout glitch", err);
        }
    };

    // FACTS AND LOGIC: If 'user' has data, they are authenticated. If it's null, they aren't.
    const isAuthenticated = !!user;

    return { 
        user, 
        isAuthenticated, 
        isLoading: loading, // Map 'loading' from context to 'isLoading' for your UI
        handleLogOut, 
        handleLogin, 
        handleRegister
    };
};