import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Founded in 2001, we've grown to 5 offices covering 10 counties. As a family-owned business, we focus on quality patient care, not quantity. Our commitment to excellence sets us apart, ensuring our services benefit our communities.
        </motion.p>
      </HeroContent>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 600;
    text-align: center;
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    line-height: 1.6;
    text-align: center;
  }

  @media (max-width: 1200px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
`;

export default HeroSection;