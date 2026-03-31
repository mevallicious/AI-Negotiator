import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, AtSign, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/main.scss';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  
  const { handleRegister, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
      await handleRegister(formData);
      navigate('/dashboard'); 
    } catch (err) {
      setErrorMsg(err);
    }
  };

  return (
    <div className="auth-container">
      {/* Logo Area */}
      <div className="auth-logo-area">
        <h1>DhurAnchor</h1>
        <div className="auth-badge">Where facts meet logic! 🦉</div>
      </div>

      
      <div className="auth-card">
        <form className="auth-form" onSubmit={onSubmit}>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, textAlign: 'center', marginBottom: '1.5rem', color: '#3E2723' }}>
            I'm New Here
          </h2>

          {errorMsg && <div className="auth-error">🚨 {errorMsg}</div>}

          <div className="input-group">
            <label>Wacky Username</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                name="username"
                placeholder="e.g. FactFinder42" 
                value={formData.username}
                onChange={handleChange}
                required
              />
              <User size={20} strokeWidth={2.5} className="icon" />
            </div>
            <span className="hint">Don't worry, I won't tell Ankur Bhaiya your real name.</span>
          </div>

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                name="email"
                placeholder="you@facts.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
              <AtSign size={20} strokeWidth={2.5} className="icon" />
            </div>
          </div>

          <div className="input-group">
            <label>Secret Password</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Lock size={20} strokeWidth={2.5} className="icon" />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Creating Identity...' : 'Join the Fun!'}
          </button>

          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#0066CC', textDecoration: 'underline' }}>
                Let Me In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;