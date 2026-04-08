import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBookmark } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome />
        <span>home</span>
      </Link>
      <Link
        to="/saved"
        className={location.pathname === '/saved' ? 'active' : ''}
      >
        <FaBookmark />
        <span>saved</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
