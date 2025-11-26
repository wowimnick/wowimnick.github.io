import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';

const values = [
  {
    title: 'Dignity and Respect',
    description: 'We recognize the innate worth of every individual, regardless of their circumstances.'
  },
  {
    title: 'Personalized Care',
    description: 'Our services are tailored to each patient\'s unique needs and goals.'
  },
  {
    title: 'Empowerment',
    description: 'We strive to maximize each person\'s potential and enhance their self-respect.'
  },
  {
    title: 'Holistic Approach',
    description: 'We view aging and chronic conditions as part of life\'s journey, providing comprehensive support.'
  }
];

const AgencyValues = () => {
  return (
    <ValuesWrapper>
      <SectionTitle>Our Commitment to You</SectionTitle>
      <ValuesList>
        {values.map((value, index) => (
          <ValueItem
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ValueNumber>{index + 1}</ValueNumber>
            <ValueContent>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueContent>
          </ValueItem>
        ))}
      </ValuesList>
    </ValuesWrapper>
  );
};

const ValuesWrapper = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.35rem;
    margin-bottom: 1.25rem;
  }
`;

const ValuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ValueItem = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid #e8eaed;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 0;
    gap: 0.75rem;
  }
`;

const ValueNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ff5722;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 26px;
    font-size: 0.8rem;
  }
`;

const ValueContent = styled.div`
  flex: 1;
`;

const ValueTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.4rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }
`;

const ValueDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #5f6368;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.45;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.4;
  }
`;

export default AgencyValues;