import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion } from 'framer-motion';
import { Award, Clock, Shield, Users, BarChart, Globe } from 'lucide-react';

const highlights = [
  { icon: <Award size={32} />, text: 'Medicare Certified', color: '#fee301' }, // Sunset Yellow
  { icon: <Shield size={32} />, text: 'CHAP Accredited', color: '#ff5722' },   // Sunset Orange
  { icon: <Clock size={32} />, text: '24/7/365 Availability', color: '#ef1c1f' }, // Sunset Red
  { icon: <Users size={32} />, text: 'Background Checked Employees', color: '#ff8f00' }, // Deep Amber
  { icon: <BarChart size={32} />, text: 'QAPI Committee Oversight', color: '#d84315' }, // Deep Orange
  { icon: <Globe size={32} />, text: 'Multiple Languages', color: '#c62828' }, // Dark Red
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
      background-color: #ff5722;
    }
  }

  @media (max-width: 768px) {
    margin: 2.5rem 0;
    padding: 0 1rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 2rem;

      &::after {
        width: 80px;
        height: 2px;
        bottom: -8px;
      }
    }
  }

  @media (max-width: 480px) {
    margin: 2rem 0;
    padding: 0 0.75rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;

      &::after {
        width: 70px;
      }
    }
  }
`;

const HighlightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const HighlightItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  p {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
    margin: 0;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    flex-direction: row;
    text-align: left;
    justify-content: flex-start;
    gap: 1rem;

    p {
      font-size: 0.9rem;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 1rem;

  svg {
    color: white;
  }

  @media (max-width: 768px) {
    width: 54px;
    height: 54px;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    margin-bottom: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export default CompanyHighlights;