import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">My Portfolio</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/projects" className="hover:text-gray-300">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-gray-300">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            
            {currentUser ? (
              <>
                <li><Link to="/admin" className="hover:text-gray-300">Admin</Link></li>
                <li><button onClick={handleLogout} className="hover:text-gray-300">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
