import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For redirection
import '../style/Login.css';  // Import CSS

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // To get the last visited page
  const from = location.state?.from?.pathname || '/'; // Default to home if no last page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: name === "email" ? value.toLowerCase() : value, // Convert email to lowercase
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const token = await response.text(); // Get the token from response body
        localStorage.setItem('token', token); // Store the token in local storage
        
        // Redirect to the last visited page or home
        navigate(from, { replace: true });
      } else if (response.status === 401) {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </form>
    </div>
  );
};

export default Login;
