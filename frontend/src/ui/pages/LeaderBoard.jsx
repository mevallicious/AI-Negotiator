import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../../hooks/useScore';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/main.scss';

const LeaderboardPage = () => {
  const { leaderboard, getLeaderboard, loading } = useScore();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch the leaderboard data when the page loads
  useEffect(() => {
    getLeaderboard();
  }, []);

  // Helper function to assign a funny style badge based on discount or rounds
  const getStyleBadge = (rounds, discount) => {
    if (rounds > 10) return { label: 'SPAMMED LOWBALL', class: 'spam' };
    if (discount > 50) return { label: 'MASTER NEGOTIATOR', class: 'master' };
    return { label: 'JUST LUCKY', class: 'lucky' };
  };

  return (
    <div className="leaderboard-wrapper">
      
      {/* HEADER */}
      <div className="leaderboard-header">
        <div className="trophy-container">🏆</div>
        <h1>The Big Board</h1>
        <p>Where the legendary haggles live forever and the lowballers are remembered in infamy.</p>
      </div>

      {/* THE BOARD */}
      <div className="board-card">
        <div className="board-grid-header">
          <div>RANK</div>
          <div>NEGOTIATOR</div>
          <div>FINAL PRICE</div>
          <div>STYLE POINT</div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', fontWeight: 'bold' }}>
            Fetching facts and logic... 🕵️‍♂️
          </div>
        ) : (
          leaderboard?.map((score, index) => {
            const isCurrentUser = user && user._id === score.userId;
            const rank = index + 1;
            const style = getStyleBadge(score.rounds, score.discountPercentage);

            return (
              <div key={score._id} className={`board-row ${isCurrentUser ? 'is-current-user' : ''}`}>
                
                {/* 1. Rank */}
                <div className={`rank-col ${rank <= 3 ? 'top-3' : ''}`}>
                  #{rank}{rank === 1 && '★'}
                </div>

                {/* 2. User Info */}
                <div className="user-col">
                  <div className="avatar">
                    {/* Just grab the first letter of their username */}
                    {score.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <span className="username">{score.username}</span>
                    <span className="user-tier">
                      vs. {score.productName.split(' ')[0]} ({score.rounds} rounds)
                    </span>
                    {isCurrentUser && <span className="thats-you">THAT'S YOU!</span>}
                  </div>
                </div>

                {/* 3. Final Price */}
                <div className="price-col">
                  <div className="price-badge">${score.finalPrice}</div>
                </div>

                {/* 4. Style Point */}
                <div className="style-col">
                  <div className={`style-badge ${style.class}`}>
                    {score.rankTitle || style.label}
                  </div>
                </div>

              </div>
            );
          })
        )}
        
        {/* Fallback if database is totally empty */}
        {!loading && leaderboard?.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', fontWeight: 'bold' }}>
            No legends yet. Be the first to secure a deal!
          </div>
        )}
      </div>

      {/* CTA FOOTER */}
      <div className="cta-card">
        <div className="cta-text">
          <h2>Think you can do better?</h2>
          <p>Challenge the current kings of the board and secure your spot.</p>
        </div>
        <button className="btn-cta" onClick={() => navigate('/dashboard')}>
          Start Haggling 📈
        </button>
      </div>

    </div>
  );
};

export default LeaderboardPage;