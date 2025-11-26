import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">
        <LogoImage src="/logo.png" alt="Confident Care of Florida Logo" />
        <LogoText>
          <CompanyName>Confident Care</CompanyName>
          <Tagline>of Florida</Tagline>
        </LogoText>
      </Link>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef1c1f;
`;

const Tagline = styled.span`
  font-size: 1rem;
  color: #666;
`;

export default Logo;