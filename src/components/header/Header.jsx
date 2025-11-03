import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import "@fontsource/poppins";
import "@fontsource/montserrat";
import logo from '../../assets/logo.png';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';


const HeaderWrapper = styled.header`
  background-color: ${props => {
    if (props.$scrolled) {
      return 'rgba(255, 255, 255, 0.95)';
    } else {
      return 'transparent';
    }
  }};
  --nav-item-color: ${props => props.$scrolled ? '#333' : '#f3f3f3'};
  box-shadow: ${props => props.$scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1093px) {
    background-color: ${props => props.$isOpen ? 'rgba(255, 255, 255, 0.95)' : (props.$scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
    --nav-item-color: ${props => props.$isOpen || props.$scrolled ? '#333' : '#f3f3f3'};
    backdrop-filter: ${props => props.$isOpen || props.$scrolled ? 'blur(10px)' : 'none'};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 1094px) {
    padding: 0.875rem 1rem;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.75rem;
  }
`;

const LeftSection = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 1094px) {
    flex: initial;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1094px) {
    display: none;
  }
`;

const MobileRightSection = styled.div`
  display: none;

  @media (max-width: 1094px) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const LogoWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    gap: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    a {
      gap: 0.4rem;
    }
  }
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: ${props => props.$scrolled ? 'none' : 'brightness(0) invert(1)'};

  @media (max-width: 1094px) {
    filter: ${props => props.$scrolled || props.$isOpen ? 'none' : 'brightness(0) invert(1)'};
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.2;
  transition: all 0.3s ease;
  color: ${props => props.$scrolled ? '#ff6b6b' : '#fff'};

  @media (max-width: 1094px) {
    color: ${props => props.$scrolled || props.$isOpen ? '#ff6b6b' : '#fff'};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 1094px) {
    width: 100%;
    justify-content: center;
    order: 3;
  }
`;

const NavToggle = styled.div`
  display: none;
  cursor: pointer;
  color: var(--nav-item-color);
  padding: 0.5rem;

  @media (max-width: 1094px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HamburgerIcon = styled.div`
  width: 28px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: var(--nav-item-color);
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform-origin: center;
    transition: .25s ease-in-out;

    &:nth-child(1) {
      top: ${props => props.$isOpen ? '50%' : '0px'};
      transform: ${props => props.$isOpen ? 'translateY(-50%) rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      top: ${props => props.$isOpen ? '50%' : '100%'};
      transform: ${props => props.$isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-100%) rotate(0)'};
    }
  }

  &:hover span {
    background: #ff6b6b;
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 18px;

    span {
      height: 2.5px;
    }
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1094px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.98);
    max-height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 70px)' : '0')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    overflow-y: auto;
    overflow-x: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out;
    box-shadow: ${({ $isOpen }) => ($isOpen ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
    backdrop-filter: blur(10px);
  }

  @media (max-width: 480px) {
    top: 63px;
    max-height: ${({ $isOpen }) => ($isOpen ? 'calc(100vh - 63px)' : '0')};
  }
`;

const NavItem = styled(NavLink)`
  color: var(--nav-item-color);
  text-decoration: none;
  padding: 1rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #ff6b6b;
    transition: all 0.3s ease;
  }

  &:hover, &.active {
    color: #ff6b6b;

    &::after {
      width: 100%;
      left: 0;
    }
  }

  @media (max-width: 1094px) {
    padding: 1.25rem 2rem;
    width: 100%;
    color: #333;
    font-size: 1.05rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    justify-content: center;

    &:last-child {
      border-bottom: none;
    }

    &::after {
      display: none;
    }

    &:hover, &.active {
      background-color: rgba(255, 107, 107, 0.08);
    }
  }

  @media (max-width: 480px) {
    padding: 1.15rem 1.5rem;
    font-size: 1rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  transition: all 0.3s ease;

  span {
    transition: all 0.3s ease;
    color: var(--nav-item-color);
  }

  a {
    color: var(--nav-item-color);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: #ff6b6b;
      transform: scale(1.1);
    }
  }

  @media (max-width: 1094px) {
    gap: 0.75rem;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #333;
`;


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth > 1094) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open on mobile
    if (isOpen && window.innerWidth <= 1094) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    // Close menu when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (isOpen && window.innerWidth <= 1094 && headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <HeaderWrapper $scrolled={scrolled} $isOpen={isOpen} ref={headerRef}>
      <HeaderContent>
        <LeftSection>
          <LogoWrapper>
            <Link to="/" onClick={closeMenu}>
              <LogoImage src={logo} alt="Confident Care of Florida Logo" $scrolled={scrolled} $isOpen={isOpen} />
              <LogoText $scrolled={scrolled} $isOpen={isOpen}>
                <span>Confident Care</span>
                <span>of Florida</span>
              </LogoText>
            </Link>
          </LogoWrapper>
          <MobileRightSection>
            <ContactInfo>
              <InfoItem>
                <a href='https://www.linkedin.com/in/confident-care-of-florida-corp-b1b10b70' target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              </InfoItem>
              <InfoItem>
                <a href='https://www.instagram.com/confidentcareflorida/' target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </InfoItem>
              <InfoItem>
                <a href='https://www.facebook.com/confidentcareflorida' target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
              </InfoItem>
            </ContactInfo>
            <NavToggle onClick={toggleMenu}>
              <HamburgerIcon $isOpen={isOpen}>
                <span></span>
                <span></span>
                <span></span>
              </HamburgerIcon>
            </NavToggle>
          </MobileRightSection>
        </LeftSection>
        <NavWrapper>
          <NavMenu $isOpen={isOpen}>
            <NavItem to="/" end onClick={closeMenu}>Home</NavItem>
            <NavItem to="/services" onClick={closeMenu}>Services</NavItem>
            <NavItem to="/about-us" onClick={closeMenu}>About Us</NavItem>
            <NavItem to="/locations" onClick={closeMenu}>Locations</NavItem>
            <NavItem to="/insurances" onClick={closeMenu}>Insurances</NavItem>
            <NavItem to="/careers" onClick={closeMenu}>Careers</NavItem>
          </NavMenu>
        </NavWrapper>
        <RightSection>
          <ContactInfo>
            <InfoItem>
              <a href='https://www.linkedin.com/in/confident-care-of-florida-corp-b1b10b70' target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn size={24} />
              </a>
            </InfoItem>
            <InfoItem>
              <a href='https://www.instagram.com/confidentcareflorida/' target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </InfoItem>
            <InfoItem>
              <a href='https://www.facebook.com/confidentcareflorida' target="_blank" rel="noopener noreferrer">
                <FaFacebookF size={24} />
              </a>
            </InfoItem>
          </ContactInfo>
        </RightSection>
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;