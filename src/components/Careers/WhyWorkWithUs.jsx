import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Clock, Shield } from 'lucide-react';

const WhyWorkWithUs = () => {
  const benefits = [
    { icon: <Heart />, title: 'Compassionate Care', description: 'Make a real difference every day' },
    { icon: <TrendingUp />, title: 'Career Growth', description: 'Continuous learning opportunities' },
    { icon: <Clock />, title: 'Work-Life Balance', description: 'Flexible schedules available' },
    { icon: <Shield />, title: 'Job Security', description: 'Stable, growing industry' },
  ];

  return (
    <WhyWorkWithUsWrapper>
      <Container>
        <Title>Why Work With Us?</Title>
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <IconCircle>{benefit.icon}</IconCircle>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </WhyWorkWithUsWrapper>
  );
};

const WhyWorkWithUsWrapper = styled.section`
  background-color: #fff9f0;
  padding: 3rem 1rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const BenefitCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @media (max-width: 480px) {
    padding: 1.15rem;
    border-radius: 6px;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  background-color: #ff5722;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    margin-bottom: 0.875rem;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
    margin-bottom: 0.75rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 0.45rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.4rem;
  }
`;

const BenefitDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.35;
  }
`;

export default WhyWorkWithUs;