import React from 'react';
import './Navbar.css';
import { animateScroll as scroll, scroller } from 'react-scroll'

const Navbar = () => {
  
  return (
    <div className='Navbar'>
        NICK
        <div style={{display: 'flex'}}>
            <button className='NavbarItem' target="_blank" onClick={() => { scroll.scrollToTop() }}>Home</button>
            <a href="https://acrobat.adobe.com/id/urn:aaid:sc:US:4343419b-ef20-489d-abed-6b33865ae7a4" className='NavbarItem' target="_blank">Resume</a>
        </div>
  </div> 
  );
};

export default Navbar;