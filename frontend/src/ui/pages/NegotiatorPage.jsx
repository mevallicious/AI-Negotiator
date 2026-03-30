import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import '../../styles/main.scss';

const NegotiatorPage = () => {
  // 🚨 Renamed placeBid to sendBid to match the hook!
  const { session, messages, patience, status, sendBid, loading } = useGame();
  const [bidAmount, setBidAmount] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If session is null, wait. Only navigate away if we are sure there is no game.
  if (!session) {
    return (
      <div className="arena-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 900 }}>INITIALIZING ARENA...</h1>
      </div>
    );
  }

  const getOpponentImage = (name) => {
    if (!name) return "/dhruv.jpg";
    if (name.includes("Dhruv")) return "/dhruv.jpg";
    if (name.includes("Virat")) return "/virat.jpg";
    if (name.includes("Trump")) return "/trump.jpg";
    return "/dhruv.jpg";
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (!messageInput || !bidAmount) return;
    
    // 🚨 Calling sendBid now
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
              <div className="patience-fill" style={{ width: `${(patience / 20) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="terminal-card">
          <div className="terminal-header">
            <div className="dots"><div className="red"></div><div className="yellow"></div><div className="green"></div></div>
            <div className="title">NEGOTIATION_TERMINAL_V1.0</div>
          </div>
          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index} className={`msg-wrapper ${msg.role === 'user' ? 'user' : 'ai'}`}>
                <div className={`bubble ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`}>{msg.content}</div>
                <div className="meta">{msg.role === 'user' ? 'YOU' : session.sellerName}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleBidSubmit}>
            <input type="text" placeholder="Your offer..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} disabled={loading} required />
            <input type="number" placeholder="$" style={{ width: '80px' }} value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} disabled={loading} required />
            <button type="submit" className="btn-bid" disabled={loading}>BID</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NegotiatorPage;