import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

const HeroSection = () => {
  return (
    <HeroWrapper>
      <HeroInner>
        <TextCol>
          <Eyebrow {...fadeUpProps(0, { inView: false })}>Since 2001</Eyebrow>
          <Title {...fadeUpProps(0.1, { inView: false })}>
            Caring for Florida,<br />one home at a time.
          </Title>
          <Subhead {...fadeUpProps(0.2, { inView: false })}>
            Founded in 2001, we&apos;ve grown to 5 offices covering 10 counties — bringing skilled, compassionate care to families across the state.
          </Subhead>
        </TextCol>
      </HeroInner>
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.45)),
    url('${HERO_IMAGE}');
  background-size: cover;
  background-position: center;
  font-family: ${tokens.font};
  padding: calc(72px + 4rem) ${tokens.gutters} 4rem;
  min-height: 420px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    min-height: 340px;
    padding: calc(72px + 3rem) ${tokens.gutters} 3rem;
  }
`;

const HeroInner = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  width: 100%;
`;

const TextCol = styled.div`
  max-width: 640px;
`;

const Eyebrow = styled(motion.span)`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.gold};
  margin-bottom: 0.75rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, ${tokens.fs.h1});
  font-weight: 700;
  color: ${tokens.surface};
  line-height: ${tokens.lh.tight};
  margin: 0 0 1rem;
`;

const Subhead = styled(motion.p)`
  font-size: ${tokens.fs.lg};
  color: rgba(255, 255, 255, 0.85);
  line-height: ${tokens.lh.loose};
  max-width: 520px;
  margin: 0;
`;

export default HeroSection;
