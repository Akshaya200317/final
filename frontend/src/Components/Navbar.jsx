import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import auth from '../Config/firebase';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">ClothStore</h1>
      
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/Landing">HOME</Link></li>
        <li><Link to="/About">About Us</Link></li>
        <li><Link to="/Cart">Your Cart</Link></li>
        <li><Link to="/Contact">Get in Touch</Link></li>
        <li><Link to="/Admin">Admin Panel</Link></li>
        <button className='logout-button' onClick={handleLogout}>Sign Out</button>
        
      </ul>

     
    </nav>
  );
};

export default NavigationBar;
