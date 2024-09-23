import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Auth.css'; // Add styles if needed

function Auth({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      alert('Login successful!');
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', { name, email, password });
      alert('Sign up successful!');
    } catch (error) {
      alert('Sign up failed: ' + error.response.data.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
  };

  return (
    <div className="auth-container">
      {type === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <button type="button" onClick={handleGoogleLogin} className="google-login">
            Sign in with Google
          </button>
          <p>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit} className="auth-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={handleGoogleLogin} className="google-login">
            Sign up with Google
          </button>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
