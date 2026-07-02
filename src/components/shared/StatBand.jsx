import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const StatBand = ({ stats = [] }) => {
  return (
    <Band>
      {stats.map((stat, index) => (
        <StatItem key={stat.label} {...fadeUpProps(staggerDelay(index))}>
          <StatValue>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </StatItem>
      ))}
    </Band>
  );
};

const Band = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem) ${tokens.gutters};
  font-family: ${tokens.font};

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const StatItem = styled(motion.div)`
  flex: 1;
  text-align: center;
  padding: 0 2rem;
  min-width: 140px;

  &:not(:last-child) {
    border-right: 1px solid ${tokens.hairline};

    @media (max-width: 640px) {
      border-right: none;
      border-bottom: 1px solid ${tokens.hairline};
      padding-bottom: 1.5rem;
      width: 100%;
    }
  }
`;

const StatValue = styled.div`
  font-size: clamp(2rem, 5vw, ${tokens.fs.h2});
  font-weight: 700;
  color: ${tokens.brand};
  line-height: ${tokens.lh.tight};
  margin-bottom: 0.35rem;
`;

const StatLabel = styled.div`
  font-size: ${tokens.fs.sm};
  color: ${tokens.grey};
  font-weight: 500;
`;

export default StatBand;
