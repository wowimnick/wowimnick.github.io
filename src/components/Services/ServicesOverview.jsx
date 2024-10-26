import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

const ServiceOverview = () => {
  return (
    <OverviewWrapper>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Comprehensive Care at Your Fingertips
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        At Confident Care of Florida, we provide a wide range of skilled patient services to meet all your healthcare needs. Our dedicated team of professionals is committed to delivering exceptional care right in the comfort of your home.
      </motion.p>
    </OverviewWrapper>
  );
};

const OverviewWrapper = styled.section`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin: 4rem 0;

  h2 {
    font-size: 2.7rem;
    color: #4a90e2;
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
`;

export default ServiceOverview;