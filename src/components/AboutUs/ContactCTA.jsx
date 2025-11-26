import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <CTAWrapper>
      <h2>Ready to Experience Our Care?</h2>
      <p>Contact us today to learn more about our services or to schedule an appointment.</p>
      <CTAButton to="/locations">Contact Us</CTAButton>
    </CTAWrapper>
  );
};

const CTAWrapper = styled.section`
  background: linear-gradient(135deg, #ff5622b2 0%, #ef1c1fce 100%);
  font-family: 'Poppins', sans-serif;
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 10px;
  margin: 4rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    margin: 3rem 0;
    border-radius: 8px;

    h2 {
      font-size: 1.6rem;
      margin-bottom: 0.875rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    margin: 2rem 0;
    border-radius: 6px;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #ef1c1f;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff9f0;
    transform: translateY(-3px);
    color: #ff5722;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 40px;
  }
`;

export default ContactCTA;