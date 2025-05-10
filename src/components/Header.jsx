
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <div className="header-container">
        <Link to="/" className="logo">Apollo 24x7</Link>
        
        {/* Hamburger button for mobile */}
        <button className="hamburger-btn" onClick={toggleMenu}>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
        </button>

        <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
          <nav className="navlink">
            <NavLink 
              to="/specialties/general-physician" 
              className="navList"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </NavLink>
            <NavLink 
              to="/jh" 
              className="navList"
              onClick={() => setIsMenuOpen(false)}
            >
              Pharmacy
            </NavLink>
            <NavLink 
              to="/jhjj" 
              className="navList"
              onClick={() => setIsMenuOpen(false)}
            >
              Lab Tests
            </NavLink>
            <NavLink 
              to="/bg" 
              className="navList"
              onClick={() => setIsMenuOpen(false)}
            >
              Surgeries
            </NavLink>
          </nav>
          <div className='add-btn-container'> 
            <Link to="/addDoctor" className='add-btn-link' onClick={() => setIsMenuOpen(false)}>
              <button className="add-btn">
                Add Doctor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

















