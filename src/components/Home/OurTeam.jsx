import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const teamPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Team group photo 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    alt: 'Team group photo 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Team group photo 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Team group photo 4',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Team group photo 5',
  },
  {
    src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Team group photo 6',
  },
];

const OurTeam = () => {
  return (
    <TeamWrapper>
      <SectionHeader
        eyebrow="Our People"
        title="Meet Our Team"
        subtitle="Dedicated professionals committed to delivering exceptional home health care across Florida."
      />
      <TeamPhotoGrid>
        {teamPhotos.map((photo, index) => (
          <TeamPhotoWrapper key={photo.alt + index} {...fadeUpProps(staggerDelay(index))}>
            <TeamPhoto src={photo.src} alt={photo.alt} loading="lazy" />
          </TeamPhotoWrapper>
        ))}
      </TeamPhotoGrid>
    </TeamWrapper>
  );
};

const TeamWrapper = styled.section`
  padding: clamp(3rem, 8vw, 5rem) ${tokens.gutters};
  font-family: ${tokens.font};
  background: ${tokens.surfaceWarm};
`;

const TeamPhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: ${tokens.maxW};
  margin: 0 auto;
`;

const TeamPhotoWrapper = styled(motion.div)`
  border-radius: ${tokens.rLg}px;
  overflow: hidden;
  box-shadow: ${tokens.shadowSm};
  transition: transform ${tokens.dur.fast}s ease, box-shadow ${tokens.dur.fast}s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadowMd};
  }
`;

const TeamPhoto = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  transition: transform ${tokens.dur.slow}s ease;

  ${TeamPhotoWrapper}:hover & {
    transform: scale(1.04);
  }

  @media (max-width: 768px) {
    height: 240px;
  }
`;

export default OurTeam;
