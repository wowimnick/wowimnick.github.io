import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { Heart, Goal, Lightbulb } from 'lucide-react';

const missions = [
  {
    icon: <Heart size={24} />,
    title: 'Our Mission',
    description: 'To provide professional and quality services to patients in their homes, helping them achieve their highest potential in daily activities. We are dedicated to delivering multidisciplinary care through skilled clinicians who understand the importance of comprehensive needs assessment.'
  },
  {
    icon: <Goal size={24} />,
    title: 'Our Goal',
    description: 'To facilitate a seamless transition from facilities to home-based care, creating a safe home environment and offering top-tier nursing, therapeutic, and personal care services. We aim to support patients who might otherwise require hospital or long-term care facility stays.'
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Our Philosophy',
    description: 'We believe in the innate worth of every individual, regardless of age, race, color, creed, national origin, or disability. Our agency is committed to maximizing each person\'s potential and enhancing their self-respect. We view aging and chronic conditions as normal parts of life\'s journey and strive to support individuals in their homes, enabling them to contribute meaningfully to their families and society.'
  }
];

const MissionStatement = () => {
  return (
    <MissionWrapper>
      {missions.map((mission, index) => (
        <MissionItem
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <IconWrapper>{mission.icon}</IconWrapper>
          <MissionContent>
            <MissionTitle>{mission.title}</MissionTitle>
            <MissionDescription>{mission.description}</MissionDescription>
          </MissionContent>
        </MissionItem>
      ))}
    </MissionWrapper>
  );
};

const MissionWrapper = styled.section`
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1.75rem;
    margin: 2rem auto;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    gap: 1.5rem;
    margin: 1.5rem auto;
  }
`;

const MissionItem = styled(motion.div)`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(74, 144, 226, 0.1);
  color: #4a90e2;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const MissionContent = styled.div`
  flex: 1;
`;

const MissionTitle = styled.h3`
  font-size: 1.35rem;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
    margin-bottom: 0.4rem;
  }
`;

const MissionDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.65;
  color: #5f6368;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.55;
  }
`;

export default MissionStatement;