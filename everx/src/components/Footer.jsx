import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <p>&copy; {new Date().getFullYear()} - <a className='copyright' href="https://nickpopel.com">nickpopel.com</a></p>
    </footer>
  );
};

export default Footer;