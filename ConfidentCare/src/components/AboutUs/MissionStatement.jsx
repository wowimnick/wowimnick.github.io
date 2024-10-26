import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { Heart, Goal, Lightbulb } from 'lucide-react';

const MissionStatement = () => {
  return (
    <MissionWrapper>
      <MissionItem
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <IconWrapper>
          <Heart size={32} />
        </IconWrapper>
        <h3>Our Mission</h3>
        <p>To provide professional and quality services to patients in their homes, helping them achieve their highest potential in daily activities. We are dedicated to delivering multidisciplinary care through skilled clinicians who understand the importance of comprehensive needs assessment.</p>
      </MissionItem>
      <MissionItem
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <IconWrapper>
          <Goal size={32} />
        </IconWrapper>
        <h3>Our Goal</h3>
        <p>To facilitate a seamless transition from facilities to home-based care, creating a safe home environment and offering top-tier nursing, therapeutic, and personal care services. We aim to support patients who might otherwise require hospital or long-term care facility stays.</p>
      </MissionItem>
      <MissionItem
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <IconWrapper>
          <Lightbulb size={32} />
        </IconWrapper>
        <h3>Our Philosophy</h3>
        <p>We believe in the innate worth of every individual, regardless of age, race, color, creed, national origin, or disability. Our agency is committed to maximizing each person's potential and enhancing their self-respect. We view aging and chronic conditions as normal parts of life's journey and strive to support individuals in their homes, enabling them to contribute meaningfully to their families and society.</p>
      </MissionItem>
    </MissionWrapper>
  );
};

const MissionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  gap: 4rem;
  margin: 4rem auto;
  padding: 0 1rem;
  max-width: 1200px;

  @media (max-width: 768px) {
    gap: 3rem;
    margin: 3rem auto;
  }

  @media (max-width: 480px) {

    gap: 2rem;
    margin: 2rem auto;
  }
`;

const MissionItem = styled(motion.div)`
  position: relative;
  padding-left: 60px;
  

  @media (max-width: 480px) {
    padding-left: 0;
    padding-top: 60px;
  }

  h3 {
    font-size: 2rem;
    color: #4a90e2;
    margin-bottom: 1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
    
      font-size: 0.9rem;
    }
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 52px;
  height: 52px;
  color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.1);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default MissionStatement;