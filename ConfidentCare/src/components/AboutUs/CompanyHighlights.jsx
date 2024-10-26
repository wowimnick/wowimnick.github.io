import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';
import { Award, Clock, Shield, Users, BarChart, Globe } from 'lucide-react';

const highlights = [
  { icon: <Award size={32} />, text: 'Medicare Certified', color: '#ffa201' },
  { icon: <Shield size={32} />, text: 'CHAP Accredited', color: '#3b9b3f' },
  { icon: <Clock size={32} />, text: '24/7/365 Availability', color: '#6d8ea9' },
  { icon: <Users size={32} />, text: 'Background Checked Employees', color: '#9C27B0' },
  { icon: <BarChart size={32} />, text: 'QAPI Committee Oversight', color: '#FF5722' },
  { icon: <Globe size={32} />, text: 'Multiple Languages', color: '#00BCD4' },
];

const CompanyHighlights = () => {
  return (
    <HighlightsWrapper>
      <h2>What Sets Us Apart</h2>
      <HighlightsContainer>
        {highlights.map((highlight, index) => (
          <HighlightItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IconWrapper style={{ backgroundColor: highlight.color }}>
              {highlight.icon}
            </IconWrapper>
            <p>{highlight.text}</p>
          </HighlightItem>
        ))}
      </HighlightsContainer>
    </HighlightsWrapper>
  );
};

const HighlightsWrapper = styled.section`
  margin: 4rem 0;
  padding: 0 2rem;
  font-family: 'Poppins', sans-serif;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background-color: #4a90e2;
    }
  }
`;

const HighlightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const HighlightItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;

  svg {
    color: white;
  }
`;

export default CompanyHighlights;