import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <HeroBannerWrapper>
      <Content>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover rewarding career opportunities at Confident Care of Florida
        </motion.p>
      </Content>
    </HeroBannerWrapper>
  );
};

const HeroBannerWrapper = styled.div`
  background-image: url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  position: relative;
  z-index: 1;
  width: 100%;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 600;
    text-align: center;
  }

  p {
    font-size: 1.2rem;
    max-width: 600px;
    text-align: center;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.5;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;

    h1 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.4;
    }
  }
`;

export default HeroBanner;