import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useGame } from '../../hooks/useGame';
import '../../styles/main.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, handleLogOut } = useAuth();
  const { startNewGame, loading } = useGame();


  const handleHaggleClick = async (difficulty) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
     const isSuccess = await startNewGame(difficulty);
      
      if (isSuccess) {
        navigate('/negotiate'); 
      } else {
        alert("🚨 Game failed to start. Check console!");
      }
    } catch (err) {
      console.error("Failed to enter the arena", err);
    }
  };

  const onLogoutClick = async () => {
    await handleLogOut();
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Dhur Anchor</div>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              {/* If you have a separate dashboard, keep this. Otherwise, you can remove it since Landing Page IS the dashboard now! */}
              <Link to="/leaderboard" style={{ fontWeight: '800', color: '#3E2723', marginRight: '1rem' }}>
                Leaderboard
              </Link>
              {/* THE NEW LOGOUT BUTTON */}
              <button 
                onClick={onLogoutClick} 
                className="btn-signup" 
                style={{ backgroundColor: '#FF6B6B', boxShadow: '0px 4px 0px 0px #CC0000', border: '3px solid #3E2723', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-card">
          <div className="unbendable-tag">100% UNBENDABLE</div>
          
          <div className="hero-content">
            <h1>Welcome to the Arena of <br /><span>Aari Aari</span></h1>
            <p>Here, you are not just a user, you are a master negotiator. Our AIs are not just code, they are legends. Learn the ways of the unbendable deal.</p>
            {/* Smooth scroll down to the victims section instead of just navigating */}
            <button className="btn-primary" onClick={() => {
              document.getElementById('victims-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              Enter the Arena
            </button>
          </div>

          <div className="hero-image-area">
            <span className="placeholder-art">⚓</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <h2 className="section-title">How the Bidding Works: The <span>Dhur Anchor</span> Way</h2>
        
        <div className="cards-grid">
          <div className="info-card yellow">
            <div className="icon-circle" style={{ backgroundColor: '#FFD93D' }}>✋</div>
            <h3>The Perfect Pitch</h3>
            <p>You don't make an offer; you make a powerful proposition. Think deep, argue strong. Aari Aari doesn't haggle, it establishes truth.</p>
          </div>

          <div className="info-card blue">
            <div className="icon-circle" style={{ backgroundColor: '#6EB9F7' }}>🤖</div>
            <h3>The AI Crucible</h3>
            <p>Your proposal is fed into our proprietary Dhur Anchor AI. It's an unstoppable expert that doesn't just calculate; it counters, creates leverage, and finds value.</p>
          </div>

          <div className="info-card red">
            <div className="icon-circle" style={{ backgroundColor: '#FF6B6B' }}>🤝</div>
            <h3>The Unbeatable Close</h3>
            <p>We don't settle; we seal. Your "Aari Aari" is finalized—a masterful, unbendable agreement. This is how champs do it.</p>
          </div>
        </div>

        {!isAuthenticated && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn-primary" onClick={() => navigate('/register')} style={{ backgroundColor: '#0066CC', boxShadow: '0px 6px 0px 0px #004C99' }}>
              Get Started Now!
            </button>
          </div>
        )}
      </section>

      {/* CHOOSE YOUR VICTIM */}
      <section id="victims-section" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Choose Your Victim</h2>
        <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '3rem', color: 'gray' }}>Pick an opponent and test your mettle. From push-overs to philosophical masters.</p>

        <div className="cards-grid">
          
          {/* EASY: Dhruv Rathee */}
          <div className="victim-card">
            <div className="victim-image" style={{ backgroundColor: '#D4F5E9' }}>
              <div className="difficulty-badge" style={{ backgroundColor: '#0A7A3A' }}>DIFFICULTY: NOOB</div>
              <img src="/dhruv.jpg" alt="Dhruv" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="victim-content">
              <h3>Dhruv Rathee</h3>
              <p>Your practice dummy. Starts every sentence with 'Namaskar Dosto'. Very easily swayed by facts, logic, and Wikipedia links.</p>
              <button 
                className="btn-primary" 
                onClick={() => handleHaggleClick('easy')} 
                disabled={loading}
                style={{ backgroundColor: '#6EB9F7', boxShadow: '0px 4px 0px 0px #4A90E2', color: '#000' }}
              >
                {loading ? 'Booting AI...' : 'Haggle!'}
              </button>
            </div>
          </div>

          {/* MEDIUM: Virat Kohli */}
          <div className="victim-card">
            <div className="victim-image" style={{ backgroundColor: '#FFE4E1' }}>
              <div className="difficulty-badge" style={{ backgroundColor: '#B22222' }}>DIFFICULTY: PRO</div>
              <img src="/virat.jpg" alt="Virat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="victim-content">
              <h3>Virat Kohli</h3>
              <p>Negotiation isn't a game; it's art. Plays with aggression and intent. Hates time wasters. Only for true masters of the pitch.</p>
              <button 
                className="btn-primary" 
                onClick={() => handleHaggleClick('medium')} 
                disabled={loading}
                style={{ backgroundColor: '#0066CC', boxShadow: '0px 4px 0px 0px #004C99' }}
              >
                {loading ? 'Booting AI...' : 'Haggle!'}
              </button>
            </div>
          </div>

          {/* HARD: Donald Trump */}
          <div className="victim-card">
            <div className="victim-image" style={{ backgroundColor: '#FFF5E1' }}>
              <div className="difficulty-badge" style={{ backgroundColor: '#D32F2F' }}>DIFFICULTY: NIGHTMARE</div>
              <img src="/trump.jpg" alt="Trump" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="victim-content">
              <h3>Donald Trump</h3>
              <p>He's been making the best deals since the 80s. Huge deals. A formidable challenge for even the sharpest minds. Total disaster if you lose.</p>
              <button 
                className="btn-primary" 
                onClick={() => handleHaggleClick('hard')} 
                disabled={loading}
                style={{ backgroundColor: '#FF6B6B', boxShadow: '0px 4px 0px 0px #CC0000' }}
              >
                {loading ? 'Booting AI...' : 'Haggle!'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '4px solid #3E2723', padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', fontWeight: 'bold' }}>
        <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 900 }}>Dhur Anchor</div>
        <div style={{ fontSize: '0.9rem', color: 'gray' }}>© 2026 Dhur Anchor. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage;