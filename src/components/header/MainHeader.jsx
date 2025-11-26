import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight } from 'lucide-react';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #ef1c1f; }
  50% { box-shadow: 0 0 20px #ef1c1f; }
  100% { box-shadow: 0 0 5px #ef1c1f; }
`;

const MainHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(239, 28, 31, 0.2);
`;

const LogoWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    gap: 1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const LogoIcon = styled(Heart)`
  color: #ef1c1f;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;

  span:first-child {
    color: #ef1c1f;
  }

  span:last-child {
    font-size: 1.2rem;
    color: #fee301;
  }
`;

const Slogan = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: #333;
  position: relative;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #ef1c1f, #fee301);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  &::before {
    content: '"';
    font-size: 2rem;
    position: absolute;
    left: -10px;
    top: -10px;
    color: #ef1c1f;
  }

  &::after {
    content: '"';
    font-size: 2rem;
    position: absolute;
    right: -10px;
    bottom: -10px;
    color: #fee301;
  }
`;

const CTAButton = styled.button`
  background-color: #ef1c1f;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  position: relative;

  &:hover {
    background-color: #ff5722;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%);
    transform: scale(0);
    transition: transform 0.3s ease-out;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  animation: ${glowAnimation} 2s infinite;
`;

const MainHeader = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MainHeaderWrapper>
      <LogoWrapper>
        <Link to="/">
          <LogoIcon size={40} />
          <LogoText>
            <span>Confident Care</span>
            <span>of Florida</span>
          </LogoText>
        </Link>
      </LogoWrapper>
      <Slogan>Compassionate Care in the Comfort of Your Home</Slogan>
      <CTAButton
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Get Care Now
        <ChevronRight
          size={20}
          style={{
            transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.3s ease'
          }}
        />
      </CTAButton>
    </MainHeaderWrapper>
  );
};

export default MainHeader;