import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
      <div className="Navbar">
        <p>EverX</p>
        <div style={{display: 'flex'}}>
          <Link to="/register" className='NavbarItem'>Register</Link>
          <Link to="/login" className='NavbarItem'>Login</Link>
        </div>
      </div>
  );
};

export default Navbar;