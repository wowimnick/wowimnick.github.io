import React, { useRef } from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion, useInView } from 'framer-motion';

const InsuranceHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <HeroWrapper ref={ref}>
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Insurance Coverage
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We work with a wide range of insurance providers to ensure you receive the care you need
        </motion.p>
      </HeroContent>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') !important;
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    max-width: 600px;
  }
`;

export default InsuranceHero;