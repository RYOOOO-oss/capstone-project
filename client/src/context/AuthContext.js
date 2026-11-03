import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // Set default auth header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/users/login', { email, password });
      
      // Save to local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Set axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setCurrentUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Register function
  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/users/register', { username, email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      setCurrentUser(res.data.user);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
