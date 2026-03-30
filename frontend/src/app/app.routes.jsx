import { Routes, Route, Navigate } from 'react-router-dom';

// UI Components & Pages
import ProtectedRoute from '../ui/components/ProtectedRoute';
import LandingPage from '../ui/pages/LandingPage';
import LoginPage from '../ui/pages/Login';
import RegisterPage from '../ui/pages/Register';
import LeaderboardPage from "../ui/pages/LeaderBoard"
import NegotiatorPage from '../ui/pages/NegotiatorPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/leaderboard" element={<LeaderboardPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/negotiate" element={<NegotiatorPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;