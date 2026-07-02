import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';
import { Award, Clock, Shield, Users, BarChart, Globe } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const highlights = [
  { icon: Award, text: 'Medicare Certified' },
  { icon: Shield, text: 'CHAP Accredited' },
  { icon: Clock, text: '24/7/365 Availability' },
  { icon: Users, text: 'Background Checked Employees' },
  { icon: BarChart, text: 'QAPI Committee Oversight' },
  { icon: Globe, text: 'Multiple Languages' },
];

const CompanyHighlights = () => {
  return (
    <HighlightsWrapper>
      <SectionHeader eyebrow="Why Us" title="What Sets Us Apart" />
      <HighlightsContainer>
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <HighlightItem key={highlight.text} {...fadeUpProps(staggerDelay(index))}>
              <IconWrapper><Icon size={22} /></IconWrapper>
              <p>{highlight.text}</p>
            </HighlightItem>
          );
        })}
      </HighlightsContainer>
    </HighlightsWrapper>
  );
};

const HighlightsWrapper = styled.section`
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
  font-family: ${tokens.font};
  background: ${tokens.surfaceAlt};
`;

const HighlightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: ${tokens.maxW};
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${tokens.surface};
  border: 1px solid ${tokens.hairline};
  border-radius: ${tokens.rMd}px;
  padding: 1.5rem 1rem;

  p {
    font-size: ${tokens.fs.sm};
    color: ${tokens.ink};
    font-weight: 500;
    margin: 0.75rem 0 0;
  }
`;

const IconWrapper = styled.div`
  color: ${tokens.brand};
  display: flex;
`;

export default CompanyHighlights;
