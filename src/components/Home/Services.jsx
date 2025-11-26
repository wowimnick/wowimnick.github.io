import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Activity, Puzzle, MessageSquare, UserPlus, Home } from 'lucide-react';
import '@fontsource/poppins';

const services = [
  {
    icon: <Heart size={32} />,
    title: 'Skilled Nursing',
    description: 'Professional care from Registered Nurses and Licensed Practical Nurses.',
  },
  {
    icon: <Activity size={32} />,
    title: 'Physical Therapy',
    description: 'Improve mobility, strength, and balance with our expert therapists.',
  },
  {
    icon: <Puzzle size={32} />,
    title: 'Occupational Therapy',
    description: 'Enhance daily living activities and independence.',
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'Speech Therapy',
    description: 'Address communication, swallowing, and cognitive issues.',
  },
  {
    icon: <UserPlus size={32} />,
    title: 'Medical Social Work',
    description: 'Access community resources and long-term care assistance.',
  },
  {
    icon: <Home size={32} />,
    title: 'Home Health Aide',
    description: 'Personal care services to ensure safety and promote independence.',
  },
];

const HomeServices = () => {
  return (
    <ServicesWrapper>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Comprehensive Services
      </motion.h2>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IconWrapper>{service.icon}</IconWrapper>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled.section`
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #ff5722;
    text-align: center;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background-color: #fff9f0;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.2rem;
    color: #ff5722;
    margin: 1rem 0;
  }

  p {
    font-size: 1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 1.75rem;

    h3 {
      font-size: 1.1rem;
      margin: 0.875rem 0;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem;

    h3 {
      font-size: 1.05rem;
      margin: 0.75rem 0;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
`;

const IconWrapper = styled.div`
  color: #ff5722;
  background-color: rgba(255, 87, 34, 0.1);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;

    svg {
      width: 26px;
      height: 26px;
    }
  }
`;

export default HomeServices;