import React from 'react';
import './Navbar.css';
import { animateScroll as scroll, scroller } from 'react-scroll'

const Navbar = () => {
  
  return (
    <div className='Navbar'>
        NICK
        <div style={{display: 'flex'}}>
            <button className='NavbarItem' target="_blank" onClick={() => { scroll.scrollToTop() }}>Home</button>
            <a href="https://acrobat.adobe.com/id/urn:aaid:sc:US:e9eeb3c7-8088-4d5d-8750-96de0e7f435c" className='NavbarItem' target="_blank">Resume</a>
        </div>
  </div> 
  );
};

export default Navbar;