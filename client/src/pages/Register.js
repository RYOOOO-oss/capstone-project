import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(null);
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(username, email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.error || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-6">{error}</div>}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="w-full p-3 border rounded"
          />
        </div>
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
            minLength={6}
            className="w-full p-3 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength={6}
            className="w-full p-3 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
      <p className="text-center mt-6">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </div>
  );
};

export default Register;
