import React from 'react';
import "../Styles/About.css";
import NavigationBar from '../Components/Navbar';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="about-container">
        <h1 className="about-heading">About Us</h1>
        <p className="about-text">
          Welcome to ClothStore, your ultimate destination for fashionable clothing and unique styles. We are dedicated to providing you with a curated selection of high-quality apparel, designed to enhance your individuality and style.
        </p>
        <p className="about-text">
          Founded in 2024 by fashion enthusiast Alex, ClothStore began with a vision to make stylish clothing accessible to everyone. From our humble beginnings, we have rapidly grown into a vibrant clothing brand, serving fashion lovers across the nation.
        </p>
        <p className="about-text">
          We invite you to explore our exclusive collections, featuring the latest trends and timeless classics. Our commitment to sustainability and ethical practices ensures that you can shop with confidence. 
        </p>
        <p className="about-text">
          If you have any questions or need assistance, don’t hesitate to reach out!
        </p>
        <button className="contact-button">
          <Link to={'/contact-page'}>Get in Touch</Link>
        </button>
      </div>
    </>
  );
};

export default AboutPage;
