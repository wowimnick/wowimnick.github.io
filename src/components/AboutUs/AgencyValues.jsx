import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';

const AgencyValues = () => {
  return (
    <ValuesWrapper>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Commitment to You
      </motion.h2>
      <ValuesList>
        <ValueItem>
          <h3>Dignity and Respect</h3>
          <p>We recognize the innate worth of every individual, regardless of their circumstances.</p>
        </ValueItem>
        <ValueItem>
          <h3>Personalized Care</h3>
          <p>Our services are tailored to each patient's unique needs and goals.</p>
        </ValueItem>
        <ValueItem>
          <h3>Empowerment</h3>
          <p>We strive to maximize each person's potential and enhance their self-respect.</p>
        </ValueItem>
        <ValueItem>
          <h3>Holistic Approach</h3>
          <p>We view aging and chronic conditions as part of life's journey, providing comprehensive support.</p>
        </ValueItem>
      </ValuesList>
    </ValuesWrapper>
  );
};

const ValuesWrapper = styled.section`
  margin: 4rem 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 2rem;
  }
`;

const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ValueItem = styled(motion.div)`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    text-spacing: 1px;
    color: #4a90e2;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
  }
`;

export default AgencyValues;