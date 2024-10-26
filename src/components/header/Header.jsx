import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import "@fontsource/poppins";
import "@fontsource/montserrat";
import logo from '../../assets/logo.png';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
    };

    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderWrapper $scrolled={scrolled} $isOpen={isOpen}>
      <HeaderContent>
        <LeftSection>
          <LogoWrapper>
            <Link to="/">
              <LogoImage src={logo} alt="Confident Care of Florida Logo" $scrolled={scrolled} />
              <LogoText $scrolled={scrolled}>
                <span>Confident Care</span>
                <span>of Florida</span>
              </LogoText>
            </Link>
          </LogoWrapper>
        </LeftSection>
        <NavWrapper>
          <NavToggle onClick={toggleMenu}>
            <HamburgerIcon $isOpen={isOpen}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </NavToggle>
          <NavMenu $isOpen={isOpen}>
            <NavItem to="/" end onClick={toggleMenu}>Home</NavItem>
            <NavItem to="/services" onClick={toggleMenu}>Services</NavItem>
            <NavItem to="/about-us" onClick={toggleMenu}>About Us</NavItem>
            <NavItem to="/locations" onClick={toggleMenu}>Locations</NavItem>
            <NavItem to="/insurances" onClick={toggleMenu}>Insurances</NavItem>
            <NavItem to="/careers" onClick={toggleMenu}>Careers</NavItem>
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
          </ContactInfo>
        </RightSection>
      </HeaderContent>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: ${props => {
    if (props.$scrolled) {
      return 'rgba(255, 255, 255, 0.9)';
    } else {
      return 'transparent';
    }
  }};
  --nav-item-color: ${props => props.$scrolled ? '#333' : '#f3f3f3'};
  box-shadow: ${props => props.$scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(5px)' : 'none'};
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
    background-color: ${props => props.$isOpen ? 'rgba(255, 255, 255, 0.4)' : 'transparent'};
    --nav-item-color: ${props => props.$isOpen || props.$scrolled ? '#333' : '#f3f3f3'};
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
    padding: 1rem;
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: flex-start;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1094px) {
    display: none;
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
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: ${props => props.$scrolled ? 'none' : 'brightness(0) invert(1)'};

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
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

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 1094px) {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const NavToggle = styled.div`
  display: none;
  cursor: pointer;
  color: var(--nav-item-color);

  @media (max-width: 1094px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
`;

const HamburgerIcon = styled.div`
  width: 30px;
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
      top: ${props => props.$isOpen ? '50%' : '-2px'};
      transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      top: 50%;
      transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'translateY(-50%)'};
      opacity: ${props => props.$isOpen ? '1' : '1'};
    }

    &:nth-child(3) {
      top: ${props => props.$isOpen ? '50%' : '100%'};
      transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }
  }

  &:hover span {
    background: #ff6b6b;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1094px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.95);
    max-height: ${({ $isOpen }) => ($isOpen ? '1000px' : '0')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: #333;

    &:last-child {
      border-bottom: none;
    }
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

    &:hover {
      color: #ff6b6b;
    }
  }

  @media (max-width: 1094px) {
    display: none;
  }
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #333;
`;

export default Header;