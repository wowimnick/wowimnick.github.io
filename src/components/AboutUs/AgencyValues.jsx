import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const values = [
  { title: 'Dignity and Respect', description: 'We recognize the innate worth of every individual, regardless of their circumstances.' },
  { title: 'Personalized Care', description: "Our services are tailored to each patient's unique needs and goals." },
  { title: 'Empowerment', description: "We strive to maximize each person's potential and enhance their self-respect." },
  { title: 'Holistic Approach', description: "We view aging and chronic conditions as part of life's journey, providing comprehensive support." },
];

const AgencyValues = () => {
  return (
    <ValuesWrapper>
      <SectionHeader eyebrow="Values" title="Our Commitment to You" align="left" />
      <ValuesList>
        {values.map((value, index) => (
          <ValueItem key={value.title} {...fadeUpProps(staggerDelay(index))}>
            <ValueNumber>{String(index + 1).padStart(2, '0')}</ValueNumber>
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
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
  font-family: ${tokens.font};
`;

const ValuesList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValueItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${tokens.hairline};

  &:last-child {
    border-bottom: none;
  }
`;

const ValueNumber = styled.div`
  font-family: ${tokens.font};
  font-weight: 700;
  font-size: ${tokens.fs.h3};
  color: ${tokens.brand};
  line-height: 1;
  flex-shrink: 0;
  min-width: 2.5rem;
`;

const ValueContent = styled.div`
  flex: 1;
`;

const ValueTitle = styled.h3`
  font-size: ${tokens.fs.lg};
  font-weight: 600;
  color: ${tokens.ink};
  margin: 0 0 0.4rem;
`;

const ValueDescription = styled.p`
  font-size: ${tokens.fs.sm};
  line-height: ${tokens.lh.loose};
  color: ${tokens.grey};
  margin: 0;
`;

export default AgencyValues;
