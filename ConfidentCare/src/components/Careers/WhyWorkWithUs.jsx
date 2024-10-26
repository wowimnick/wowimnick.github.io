import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Clock, Shield } from 'lucide-react';

const WhyWorkWithUs = () => {
  const benefits = [
    { icon: <Heart />, title: 'Compassionate Care', description: 'Make a real difference in people\'s lives every day' },
    { icon: <TrendingUp />, title: 'Career Growth', description: 'Continuous learning and advancement opportunities' },
    { icon: <Clock />, title: 'Work-Life Balance', description: 'Flexible schedules to fit your lifestyle' },
    { icon: <Shield />, title: 'Job Security', description: 'Stable employment in a growing industry' },
  ];

  return (
    <WhyWorkWithUsWrapper>
      <h2>Why Work With Us?</h2>
      <BenefitsContainer>
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IconWrapper>{benefit.icon}</IconWrapper>
            <BenefitContent>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitContent>
          </BenefitItem>
        ))}
      </BenefitsContainer>
    </WhyWorkWithUsWrapper>
  );
};

const WhyWorkWithUsWrapper = styled.section`
  background: linear-gradient(135deg, #f0f5ff 0%, #e6f0ff 100%);
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    font-size: 2.7rem;
    font-weight: 600;
    color: #4a90e2;
    margin-bottom: 3rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background-color: #4a90e2;
    }
  }
`;

const BenefitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  align-items: center;
  width: calc(50% - 2rem);
  margin: 1rem;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  background-color: #4a90e2;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
`;

const BenefitContent = styled.div`
  text-align: left;

  h3 {
    font-size: 1.2rem;
    color: #4a90e2;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

export default WhyWorkWithUs;