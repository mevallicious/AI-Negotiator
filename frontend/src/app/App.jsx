import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { GameProvider } from '../context/GameContext';
import { ScoreProvider } from '../context/ScoreContext';
import AppRoutes from './app.routes';

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <ScoreProvider>
          <BrowserRouter>
              <div className="app-container">
                <AppRoutes />
              </div>
          </BrowserRouter>
        </ScoreProvider>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;