import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Our Shop</h3>
          <Link to="/main" className="footer-link">Explore Now</Link>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
        </div>
        <div className="footer-section">
          <h3>About Us</h3>
          <Link to="/contact-page" className="footer-link">Contact Support</Link>
          <Link to="/company-info" className="footer-link">Company Info</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your New Brand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
