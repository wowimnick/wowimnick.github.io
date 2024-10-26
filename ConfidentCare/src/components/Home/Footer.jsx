import React from 'react';
import styled from 'styled-components';
import { Phone, Mail } from 'lucide-react';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "@fontsource/poppins";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <CompanyInfo>
          <Logo>
            Confident Care<LogoBreak>of Florida</LogoBreak>
          </Logo>
          <Tagline>Quality Care You Can Trust</Tagline>
          <ContactInfo>
            <ContactItem>
              <Phone size={16} />
              (904) 733-1717
            </ContactItem>
            <ContactItem>
              <Mail size={16} />
              info@confidentcare.com
            </ContactItem>
          </ContactInfo>
        </CompanyInfo>
        <QuickLinksSection>
          <QuickLinksColumn>
            <QuickLinkTitle>Company</QuickLinkTitle>
            <QuickLink to="/about-us">About Us</QuickLink>
            <QuickLink to="/services">Our Services</QuickLink>
            <QuickLink to="/careers">Careers</QuickLink>
            <QuickLink to="/locations">Contact</QuickLink>
          </QuickLinksColumn>
          <QuickLinksColumn>
            <QuickLinkTitle>Legal</QuickLinkTitle>
            <QuickLink to="/privacy-policy">Privacy Policy</QuickLink>
            <QuickLink to="/terms-of-service">Terms of Service</QuickLink>
          </QuickLinksColumn>
        </QuickLinksSection>
      </FooterContent>
      <BottomBar>
        <Copyright>&copy; 2024 Confident Care of Florida. All rights reserved.</Copyright>
        
      </BottomBar>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  color: #333;
  font-family: 'Poppins', sans-serif;
  padding: 2rem 0 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #e6777d;
  line-height: 1.2;
`;

const LogoBreak = styled.span`
  display: block;
`;

const Tagline = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const QuickLinksSection = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const QuickLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuickLinkTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #e6777d;
`;

const QuickLink = styled(Link)`
  color: #666;
  text-decoration: none;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #e6777d;
  }
`;

const BottomBar = styled.div`
  background-color: #f0f0f0;
  padding: 1rem 2rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin: 0;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  background-color: #e6777d;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #d56c72;
    transform: translateY(-3px);
  }
`;

export default Footer;