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
    color: #4a90e2;
    text-align: center;
    margin-bottom: 3rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled(motion.div)`
  background-color: #f9f9f9;
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
    color: #4a90e2;
    margin: 1rem 0;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const IconWrapper = styled.div`
  color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.1);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export default HomeServices;