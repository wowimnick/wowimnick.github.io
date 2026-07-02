import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Clock, Shield } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const WhyWorkWithUs = () => {
  const benefits = [
    { icon: Heart, title: 'Compassionate Care', description: 'Make a real difference every day' },
    { icon: TrendingUp, title: 'Career Growth', description: 'Continuous learning opportunities' },
    { icon: Clock, title: 'Work-Life Balance', description: 'Flexible schedules available' },
    { icon: Shield, title: 'Job Security', description: 'Stable, growing industry' },
  ];

  return (
    <WhyWorkWithUsWrapper>
      <Container>
        <SectionHeader
          eyebrow="Why Join Us"
          title="Why Work With Us?"
          subtitle="Join a team that values compassion, growth, and meaningful impact in home health care."
        />
        <BenefitsGrid>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <BenefitCard key={benefit.title} {...fadeUpProps(staggerDelay(index))}>
                <IconCircle>
                  <Icon size={22} />
                </IconCircle>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            );
          })}
        </BenefitsGrid>
      </Container>
    </WhyWorkWithUsWrapper>
  );
};

const WhyWorkWithUsWrapper = styled.section`
  background: ${tokens.surfaceWarm};
  padding: clamp(2.5rem, 6vw, 4rem) ${tokens.gutters};
`;

const Container = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled(motion.div)`
  background: ${tokens.surface};
  padding: 1.5rem;
  border-radius: ${tokens.rLg}px;
  text-align: center;
  box-shadow: ${tokens.shadowSm};
  border: 1px solid ${tokens.hairline};
  transition: transform ${tokens.dur.fast}s ease, box-shadow ${tokens.dur.fast}s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadowMd};
  }
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  background: ${tokens.brand};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.surface};
  margin: 0 auto 1rem;
`;

const BenefitTitle = styled.h3`
  font-size: ${tokens.fs.md};
  font-weight: 600;
  color: ${tokens.ink};
  margin: 0 0 0.5rem;
  line-height: ${tokens.lh.snug};
`;

const BenefitDescription = styled.p`
  font-size: ${tokens.fs.sm};
  color: ${tokens.grey};
  line-height: ${tokens.lh.base};
  margin: 0;
`;

export default WhyWorkWithUs;
