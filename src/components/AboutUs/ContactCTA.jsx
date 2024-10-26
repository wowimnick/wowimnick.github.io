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
  background-color: #386ba7;
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
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #4a90e2;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
  }
`;

export default ContactCTA;