import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For redirection
import '../style/Signup.css';  // Import CSS

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // To get the last visited page
  const from = location.state?.from?.pathname || '/'; // Default to home if no last page

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: name === "email" ? value.toLowerCase() : value, // Convert email to lowercase
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        // Attempt to log in with the same credentials after successful signup
        const loginResponse = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });

        if (loginResponse.ok) {
          const token = await loginResponse.text(); // Get the token from response body
          localStorage.setItem('token', token); // Store the token in local storage
          
          // Redirect to the last visited page or home
          navigate(from, { replace: true });
        } else if (loginResponse.status === 401) {
          setError('Login failed. Please try again.');
        }
      } else if (response.status === 409) { // Assuming 409 is used for conflict (email already exists)
        setError('Email is already registered.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </form>
    </div>
  );
};

export default SignUp;
