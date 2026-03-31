import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';

import '../../styles/main.scss'; 

const NegotiatorPage = () => {
  const { session, messages, patience, status, sendBid, loading, startNewGame } = useGame();
  const [bidAmount, setBidAmount] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll the chat to the bottom whenever a new message appears
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  if (!session) {
    return (
      <div className="arena-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 900, color: '#3E2723', fontSize: '3rem' }}>INITIALIZING ARENA... ⏳</h1>
      </div>
    );
  }

  // Helper to grab the right image from the public folder
  const getOpponentImage = (name) => {
    if (!name) return "/dhruv.jpg";
    const lowerName = name.toLowerCase();
    if (lowerName.includes("dhruv")) return "/dhruv.jpg";
    if (lowerName.includes("virat")) return "/virat.jpg";
    if (lowerName.includes("trump")) return "/trump.jpg";
    return "/dhruv.jpg"; 
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!messageInput || !bidAmount) return;
    
    await sendBid(messageInput, Number(bidAmount));
    setMessageInput('');
    setBidAmount('');
  };

  return (
    <div className="arena-wrapper">
      <div className="arena-grid">
        
        <div className="left-panel">
          
          <div className="profile-card">
            <div className="image-wrapper">
              <img src={getOpponentImage(session.sellerName)} alt={session.sellerName} />
            </div>
            <div className="name-badge">{session.sellerName.toUpperCase()}</div>
          </div>

          <div className="offer-card">
            <h4>The Current Offer</h4>
            <h2>${session.currentPrice}</h2>
          </div>

          <div className="patience-container">
            <div className="patience-header">
              <span>💣 PATIENCE</span>
              <span className="fizz">{patience <= 5 ? 'FIZZZZZ...' : 'STABLE'}</span>
            </div>
            <div className="patience-bar-wrapper">
              <div 
                className="patience-fill" 
               
                style={{ width: `${Math.max(0, (patience / 20) * 100)}%` }}
              ></div>
            </div>
          </div>

        </div>

       
        <div className="terminal-card">
          
          <div className="terminal-header">
            <div className="dots">
              <div className="red"></div>
              <div className="yellow"></div>
              <div className="green"></div>
            </div>
            <div className="title">NEGOTIATION_TERMINAL_V1.0</div>
          </div>

          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index} className={`msg-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`bubble ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                  {msg.content}
                </div>
                <div className="meta">
                  {msg.role === 'user' ? 'YOU' : session.sellerName}
                </div>
              </div>
            ))}
           
            <div ref={chatEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleBidSubmit}>
            <input 
              type="text" 
              placeholder="Type your sneaky counter-offer..." 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
             
              disabled={loading || status !== 'ongoing'}
              required
            />
            
            <input 
              type="number" 
              placeholder="$"
              style={{ width: '120px', flex: 'none' }}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
             
              disabled={loading || status !== 'ongoing'}
              required
            />

            <button 
              type="submit" 
              className="btn-bid" 
              
              disabled={loading || status !== 'ongoing'}
            >
              BID
            </button>
          </form>

        </div>
      </div>

      {(status === 'completed' || status === 'failed') && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999, backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: '#FDF9F1', padding: '3rem', borderRadius: '20px',
            textAlign: 'center', maxWidth: '450px',
            border: '4px solid #3E2723',
            boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)'
          }}>
            
            <h1 style={{ 
              fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 900,
              color: status === 'completed' ? '#2ECC71' : '#E74C3C' 
            }}>
              {status === 'completed' ? '🎉 DEAL STRUCK! 🎉' : '🚫 DEAL DEAD! 🚫'}
            </h1>
            
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#333' }}>
              {status === 'completed' 
                ? `Kudos! You successfully haggled ${session.sellerName} down to $${session.currentPrice}!` 
                : `${session.sellerName} lost all their patience and walked away. You get nothing!`
              }
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate('/')} 
                style={{
                  padding: '1rem 2rem', fontWeight: 900, fontSize: '1rem',
                  backgroundColor: '#ccc', color: '#333', border: '3px solid #333',
                  borderRadius: '999px', cursor: 'pointer',
                  boxShadow: '4px 4px 0px 0px #000'
                }}>
                🏠 Home
              </button>
              
              <button 
                
                onClick={() => startNewGame(session.difficulty)} 
                style={{
                  padding: '1rem 2rem', fontWeight: 900, fontSize: '1rem',
                  backgroundColor: '#FFD93D', color: '#333', border: '3px solid #333',
                  borderRadius: '999px', cursor: 'pointer', 
                  boxShadow: '4px 4px 0px 0px #000'
                }}>
                🔄 Play Again!
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default NegotiatorPage;