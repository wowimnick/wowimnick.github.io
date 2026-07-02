import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '@fontsource/poppins';
import { useReferralModal } from '../../context/ReferralModalContext';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';

const images = [
  {
    url: 'https://aihcp.net/main/wp-content/uploads/2024/02/Depositphotos_622838168_S-1-1.jpg',
    alt: 'Educating family',
  },
  {
    url: 'https://www.northeastspineandsports.com/wp-content/uploads/2021/09/shutterstock_1639731775-scaled.jpg',
    alt: 'Rehabilitation',
  },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
};

const slideTransition = {
  x: { type: 'tween', duration: 1.2, ease: 'easeInOut' },
  opacity: { duration: 1.2, ease: 'easeInOut' },
};

const Hero = () => {
  const navigate = useNavigate();
  const { openModal } = useReferralModal();
  const direction = useRef(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      direction.current = 1;
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroWrapper>
      <AnimatePresence initial={false} custom={direction.current}>
        <HeroImageWrapper
          key={currentImageIndex}
          custom={direction.current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
        >
          <motion.img
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
          />
          <ImageOverlay />
        </HeroImageWrapper>
      </AnimatePresence>
      <GrainOverlay />
      <HeroContent>
        <Eyebrow {...fadeUpProps(0, { inView: false })}>
          Medicare-Certified · CHAP-Accredited
        </Eyebrow>
        <Title {...fadeUpProps(0.1, { inView: false })}>
          <TitleLine>
            Compassionate <Accent>care,</Accent>
          </TitleLine>
          in the comfort of home.
        </Title>
        <Subhead {...fadeUpProps(0.25, { inView: false })}>
          Confident Care of Florida is your Medicare-certified, CHAP-accredited home health care partner. We bring skilled nursing, occupational, physical, and speech therapy directly to you.
        </Subhead>
        <ButtonGroup {...fadeUpProps(0.4, { inView: false })}>
          <PrimaryBtn onClick={() => openModal()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Refer a Patient <ArrowRight size={18} />
          </PrimaryBtn>
          <SecondaryBtn onClick={() => navigate('/services')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Explore Services
          </SecondaryBtn>
        </ButtonGroup>
        <TextLink onClick={() => navigate('/insurances')} {...fadeUpProps(0.5, { inView: false })}>
          View accepted insurances <ArrowRight size={14} />
        </TextLink>
      </HeroContent>
      <ScrollCue
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: ${tokens.font};
  background-color: ${tokens.ink};
  padding-top: 72px;

  @media (max-width: 768px) {
    min-height: 85vh;
    padding-top: 60px;
  }
`;

const HeroImageWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 780px;
  margin-left: clamp(1.25rem, 10vw, 10%);
  padding: 2rem ${tokens.gutters} 4rem 0;
  color: ${tokens.surface};

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 2rem ${tokens.gutters} 5rem;
  }
`;

const Eyebrow = styled(motion.span)`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.gold};
  margin-bottom: 1.25rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, ${tokens.fs.h1});
  font-weight: 700;
  line-height: ${tokens.lh.snug};
  margin: 0 0 1.25rem;
`;

const TitleLine = styled.span`
  display: block;

  @media (min-width: 480px) {
    white-space: nowrap;
  }
`;

const Accent = styled.span`
  color: ${tokens.brand};
`;

const Subhead = styled(motion.p)`
  font-size: ${tokens.fs.lg};
  line-height: ${tokens.lh.loose};
  color: rgba(255, 255, 255, 0.78);
  max-width: 540px;
  margin: 0 0 2rem;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    font-size: ${tokens.fs.md};
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const PrimaryBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.85rem 1.5rem;
  font-family: ${tokens.font};
  font-size: ${tokens.fs.md};
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  &:hover {
    background: ${tokens.brandDeep};
  }
`;

const SecondaryBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${tokens.surface};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${tokens.rPill}px;
  padding: 0.85rem 1.5rem;
  font-family: ${tokens.font};
  font-size: ${tokens.fs.md};
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TextLink = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.65);
  font-family: ${tokens.font};
  font-size: ${tokens.fs.sm};
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.25rem;
  padding: 0;

  &:hover {
    color: ${tokens.surface};
  }
`;

const ScrollCue = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 2;
`;

export default Hero;
