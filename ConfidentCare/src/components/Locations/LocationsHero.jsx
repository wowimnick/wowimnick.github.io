import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

const LocationsHero = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Locations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find a Confident Care of Florida office near you
        </motion.p>
      </HeroContent>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1577017040065-650ee4d43339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
  }
`;

export default LocationsHero;