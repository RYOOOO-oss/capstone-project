import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.error || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Login</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="text-center mt-6">
        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
      </p>
    </div>
  );
};

export default Login;
