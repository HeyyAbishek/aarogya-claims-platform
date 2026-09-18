import React, { useState, useContext } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  // Pre-filled with demo credentials for portfolio visitors
  const [email, setEmail] = useState('insurer@demo.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { insurerLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('/insurers/login', { email, password });
      insurerLogin(response.data.token);
      navigate('/insurers/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: "#79D7BE" }} className="flex flex-col justify-center items-center min-h-screen relative">
      
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 bg-[#F6F4F0] px-4 py-2 rounded-lg font-semibold shadow-sm hover:scale-105 transition-transform text-gray-700"
      >
        ← Back to Home
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Insurer Login</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <input
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            className="border border-gray-400 p-2 w-80 mt-4 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-80 mt-4 rounded transition-transform transform hover:scale-105">
            Login
          </button>
        </form>
        
        <div className="mt-4 flex flex-wrap justify-center">
          <p className="text-center text-sm text-gray-500">
            Use seeded account: <b>insurer@demo.com</b> | Password: <b>password123</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
