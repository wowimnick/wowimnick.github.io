import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { fadeUpProps } from '../../styles/animations';

const ServiceOverview = () => {
  return (
    <OverviewWrapper>
      <motion.h2 {...fadeUpProps()}>
        Comprehensive Care at Your Fingertips
      </motion.h2>
      <motion.p {...fadeUpProps(0.2)}>
        At Confident Care of Florida, we provide a wide range of skilled patient services to meet all your healthcare needs. Our dedicated team of professionals is committed to delivering exceptional care right in the comfort of your home.
      </motion.p>
    </OverviewWrapper>
  );
};

const OverviewWrapper = styled.section`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin: 4rem 0;
  padding: 0 2rem;

  h2 {
    font-size: 2.7rem;
    color: #ff5722;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    color: #333;
  }

  @media (max-width: 768px) {
    margin: 3rem 0;
    padding: 0 1rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 0.875rem;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.5;
    }
  }

  @media (max-width: 480px) {
    margin: 2rem 0;
    padding: 0 0.75rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.4;
    }
  }
`;

export default ServiceOverview;