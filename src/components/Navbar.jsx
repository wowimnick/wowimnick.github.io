import React from 'react';
import './Navbar.css';
import { animateScroll as scroll, scroller } from 'react-scroll'

const Navbar = () => {
  
  return (
    <div className='Navbar'>
        NICK
        <div style={{display: 'flex'}}>
            <button className='NavbarItem' target="_blank" onClick={() => { scroll.scrollToTop() }}>Home</button>
            <a href="https://acrobat.adobe.com/id/urn:aaid:sc:US:dcf79dcc-f102-443b-be5e-ec3924b45f73" className='NavbarItem' target="_blank">Resume</a>
        </div>
  </div> 
  );
};

export default Navbar;