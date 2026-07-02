import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Puzzle, MessageSquare, UserPlus, Home, ArrowRight } from 'lucide-react';
import '@fontsource/poppins';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const services = [
  { icon: Heart, title: 'Skilled Nursing', description: 'Professional care from Registered Nurses and Licensed Practical Nurses for medication management, wound care, and more.' },
  { icon: Activity, title: 'Physical Therapy', description: 'Improve mobility, strength, and balance with our expert therapists through customized home exercise programs.' },
  { icon: Puzzle, title: 'Occupational Therapy', description: 'Enhance daily living activities and independence with fine motor and ADL training.' },
  { icon: MessageSquare, title: 'Speech Therapy', description: 'Address communication, swallowing, and cognitive issues with skilled speech-language pathologists.' },
  { icon: UserPlus, title: 'Medical Social Work', description: 'Access community resources, long-term care planning, and emotional support services.' },
  { icon: Home, title: 'Home Health Aide', description: 'Personal care services including bathing, grooming, and safety monitoring to promote independence.' },
];

const HomeServices = () => {
  const navigate = useNavigate();

  return (
    <ServicesWrapper>
      <SectionHeader
        eyebrow="What We Do"
        title="Our Comprehensive Services"
        subtitle="Skilled home health care delivered with compassion — right where patients feel most comfortable."
      />
      <ServicesGrid>
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <ServiceCard key={service.title} {...fadeUpProps(staggerDelay(index))}>
              <IconBox><Icon size={22} /></IconBox>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <LearnMore onClick={() => navigate('/services')}>
                Learn more <ArrowRight size={14} />
              </LearnMore>
            </ServiceCard>
          );
        })}
      </ServicesGrid>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled.section`
  padding: clamp(3rem, 8vw, 5rem) ${tokens.gutters};
  font-family: ${tokens.font};
  background: ${tokens.surface};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: ${tokens.maxW};
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.article)`
  background: ${tokens.surface};
  border-radius: ${tokens.rLg}px;
  padding: 2rem;
  box-shadow: ${tokens.shadowSm};
  transition: transform ${tokens.dur.base}s cubic-bezier(${tokens.ease.join(',')}),
    box-shadow ${tokens.dur.base}s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${tokens.shadowMd};
  }

  h3 {
    font-size: ${tokens.fs.lg};
    font-weight: 600;
    color: ${tokens.ink};
    margin: 1rem 0 0.5rem;
  }

  p {
    font-size: ${tokens.fs.sm};
    color: ${tokens.grey};
    line-height: ${tokens.lh.base};
    margin: 0 0 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const IconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${tokens.rMd}px;
  background: ${tokens.surfaceWarm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.brand};
`;

const LearnMore = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  color: ${tokens.brand};
  font-family: ${tokens.font};
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${tokens.brandDeep};
  }
`;

export default HomeServices;
