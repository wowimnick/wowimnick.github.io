import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import '@fontsource/poppins';
import logo from '../../assets/logo.png';
import { useReferralModal } from '../../context/ReferralModalContext';
import { tokens } from '../../styles/tokens';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about-us', label: 'About Us' },
  { to: '/locations', label: 'Locations' },
  { to: '/insurances', label: 'Insurances' },
  { to: '/careers', label: 'Careers' },
];

const DARK_HERO_ROUTES = ['/', '/services', '/about-us', '/locations', '/insurances', '/careers'];

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const { openModal } = useReferralModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => {
      if (window.innerWidth > 1094) setIsOpen(false);
    };
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen && window.innerWidth <= 1094 ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const hasDarkHero = DARK_HERO_ROUTES.includes(location.pathname);
  const light = hasDarkHero && !scrolled && !isOpen;

  return (
    <>
      <HeaderWrapper $scrolled={scrolled} $isOpen={isOpen} ref={headerRef}>
        <HeaderContent $scrolled={scrolled}>
          <LogoLink to="/" onClick={closeMenu}>
            <LogoImage
              src={logo}
              alt="Confident Care of Florida Logo"
              $light={light}
              $scrolled={scrolled}
              $isOpen={isOpen}
            />
            <LogoText $light={light} $scrolled={scrolled} $isOpen={isOpen}>
              <span>Confident Care</span>
              <span>of Florida</span>
            </LogoText>
          </LogoLink>

          <DesktopNav>
            {navLinks.map((link) => (
              <NavItem key={link.to} to={link.to} end={link.end} $scrolled={scrolled} $isOpen={isOpen} $light={light}>
                {link.label}
              </NavItem>
            ))}
          </DesktopNav>

          <RightActions>
            <ReferButton onClick={() => openModal()} $scrolled={scrolled}>
              Refer a Patient
            </ReferButton>
            <MenuToggle
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-nav"
              $scrolled={scrolled}
              $isOpen={isOpen}
              $light={light}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </MenuToggle>
          </RightActions>
        </HeaderContent>
      </HeaderWrapper>

      <AnimatePresence>
        {isOpen && (
          <MobileOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: tokens.dur.fast }}
          >
            <MobileNav id="mobile-nav">
              {navLinks.map((link, i) => (
                <MobileNavItem
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: tokens.dur.base, ease: tokens.ease }}
                >
                  {link.label}
                </MobileNavItem>
              ))}
              <MobileReferBtn
                onClick={() => { openModal(); closeMenu(); }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: tokens.dur.base, ease: tokens.ease }}
              >
                Refer a Patient
              </MobileReferBtn>
            </MobileNav>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  font-family: ${tokens.font};
  background: ${({ $scrolled, $isOpen }) =>
    $scrolled || $isOpen
      ? 'rgba(245, 245, 247, 0.72)'
      : 'transparent'};
  backdrop-filter: ${({ $scrolled, $isOpen }) =>
    $scrolled || $isOpen ? 'saturate(180%) blur(20px)' : 'none'};
  border-bottom: 1px solid
    ${({ $scrolled, $isOpen }) =>
      $scrolled || $isOpen ? tokens.hairline : 'transparent'};
  transition: all ${tokens.dur.fast}s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ $scrolled }) => ($scrolled ? '0.65rem' : '1rem')} ${tokens.gutters};
  height: ${({ $scrolled }) => ($scrolled ? '52px' : '72px')};
  transition: all ${tokens.dur.fast}s ease;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  transition: transform ${tokens.dur.fast}s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const LogoImage = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  transition: filter ${tokens.dur.fast}s ease;
  filter: ${({ $light, $scrolled, $isOpen }) =>
    $light && !$scrolled && !$isOpen ? 'brightness(0) invert(1)' : 'none'};

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  transition: color ${tokens.dur.fast}s ease;
  color: ${({ $light, $scrolled, $isOpen }) =>
    $light && !$scrolled && !$isOpen ? tokens.surface : tokens.brand};

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 1094px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  color: ${({ $scrolled, $isOpen, $light }) =>
    $scrolled || $isOpen || !$light ? tokens.inkSoft : 'rgba(255,255,255,0.92)'};
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: ${tokens.rPill}px;
  position: relative;
  transition: all ${tokens.dur.fast}s ease;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${tokens.brand};
    transition: all ${tokens.dur.fast}s ease;
  }

  &:hover {
    background: ${tokens.surfaceAlt};
    color: ${tokens.brand};
  }

  &.active {
    color: ${tokens.brand};

    &::after {
      width: calc(100% - 1.5rem);
      left: 0.75rem;
    }
  }
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ReferButton = styled.button`
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.5rem 1.125rem;
  font-family: ${tokens.font};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${tokens.dur.fast}s ease;
  white-space: nowrap;

  &:hover {
    background: ${tokens.brandDeep};
  }

  @media (max-width: 1094px) {
    display: none;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem;
  color: ${({ $scrolled, $isOpen, $light }) =>
    $scrolled || $isOpen || !$light ? tokens.ink : tokens.surface};
  align-items: center;
  justify-content: center;

  @media (max-width: 1094px) {
    display: flex;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  top: 72px;
  z-index: 999;
  background: rgba(245, 245, 247, 0.92);
  backdrop-filter: saturate(180%) blur(20px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 3rem;

  @media (max-width: 1094px) {
    display: flex;
  }

  @media (min-width: 1095px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0 2rem;
`;

const MobileNavItem = styled(motion(NavLink))`
  font-family: ${tokens.font};
  font-size: 1.375rem;
  font-weight: 600;
  color: ${tokens.ink};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${tokens.rMd}px;
  width: 100%;
  text-align: center;

  &.active {
    color: ${tokens.brand};
  }

  &:hover {
    background: ${tokens.surfaceAlt};
  }
`;

const MobileReferBtn = styled(motion.button)`
  margin-top: 1rem;
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.85rem 2rem;
  font-family: ${tokens.font};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 280px;

  &:hover {
    background: ${tokens.brandDeep};
  }
`;

export default Header;
