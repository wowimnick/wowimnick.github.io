import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';
import '@fontsource/poppins';
import logo from '../../assets/logo.png';
import { tokens } from '../../styles/tokens';

const serviceLinks = [
  { to: '/services', label: 'Skilled Nursing' },
  { to: '/services', label: 'Physical Therapy' },
  { to: '/services', label: 'Occupational Therapy' },
  { to: '/services', label: 'Speech Therapy' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <Column>
          <LogoRow>
            <LogoImage src={logo} alt="Confident Care of Florida Logo" />
            <LogoText>
              <span>Confident Care</span>
              <span>of Florida</span>
            </LogoText>
          </LogoRow>
          <Tagline>Quality home health care you can trust — Medicare-certified and CHAP-accredited across Florida.</Tagline>
          <SocialRow>
            <SocialLink href="https://www.linkedin.com/in/confident-care-of-florida-corp-b1b10b70" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn size={16} />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/confidentcareflorida/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={16} />
            </SocialLink>
            <SocialLink href="https://www.facebook.com/confidentcareflorida" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF size={16} />
            </SocialLink>
          </SocialRow>
        </Column>

        <Column>
          <ColumnTitle>Quick Links</ColumnTitle>
          <FooterLink to="/about-us">About Us</FooterLink>
          <FooterLink to="/services">Our Services</FooterLink>
          <FooterLink to="/locations">Locations</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/insurances">Insurances</FooterLink>
        </Column>

        <Column>
          <ColumnTitle>Services</ColumnTitle>
          {serviceLinks.map((link) => (
            <FooterLink key={link.label} to={link.to}>{link.label}</FooterLink>
          ))}
        </Column>

        <Column>
          <ColumnTitle>Contact</ColumnTitle>
          <ContactLink href="tel:+19047331717">
            <Phone size={15} />
            (904) 733-1717
          </ContactLink>
          <ContactLink href="mailto:info@confidentcare.com">
            <Mail size={15} />
            info@confidentcare.com
          </ContactLink>
        </Column>
      </FooterContent>

      <BottomBar>
        <Copyright>&copy; {year} Confident Care of Florida. All rights reserved.</Copyright>
        <LegalLinks>
          <FooterLink to="/privacy-policy">Privacy</FooterLink>
          <FooterLink to="/terms-of-service">Terms</FooterLink>
        </LegalLinks>
      </BottomBar>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: ${tokens.surfaceAlt};
  color: ${tokens.grey};
  font-family: ${tokens.font};
  padding-top: clamp(2.5rem, 6vw, 4rem);
  border-top: 1px solid ${tokens.hairline};
`;

const FooterContent = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: 0 ${tokens.gutters};
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const LogoImage = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  flex-shrink: 0;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${tokens.brand};
`;

const Tagline = styled.p`
  font-size: ${tokens.fs.sm};
  line-height: ${tokens.lh.loose};
  margin: 0.5rem 0 0.75rem;
  max-width: 280px;
  color: ${tokens.grey};
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: 0.25rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${tokens.surface};
  border: 1px solid ${tokens.hairline};
  color: ${tokens.inkSoft};
  transition: all ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.brand};
    border-color: ${tokens.brand};
    color: ${tokens.surface};
    transform: translateY(-2px);
  }
`;

const ColumnTitle = styled.h4`
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  color: ${tokens.ink};
  margin: 0 0 0.35rem;
  letter-spacing: 0.02em;
`;

const FooterLink = styled(Link)`
  color: ${tokens.grey};
  text-decoration: none;
  font-size: ${tokens.fs.sm};
  transition: color ${tokens.dur.fast}s ease;

  &:hover {
    color: ${tokens.brand};
  }
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${tokens.inkSoft};
  text-decoration: none;
  font-size: ${tokens.fs.sm};
  transition: color ${tokens.dur.fast}s ease;

  &:hover {
    color: ${tokens.brand};
  }
`;

const BottomBar = styled.div`
  max-width: ${tokens.maxW};
  margin: 2.5rem auto 0;
  padding: 1.25rem ${tokens.gutters};
  border-top: 1px solid ${tokens.hairline};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-size: ${tokens.fs.xs};
  margin: 0;
  color: ${tokens.greyLight};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.25rem;
`;

export default Footer;
