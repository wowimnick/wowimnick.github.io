import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { tokens } from '../../styles/tokens';
import { fadeUpInitial, fadeUpAnimate, fadeUpTransition } from '../../styles/animations';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 600);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ButtonWrapper
          initial={fadeUpInitial}
          animate={fadeUpAnimate}
          exit={fadeUpInitial}
          transition={fadeUpTransition()}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={22} />
        </ButtonWrapper>
      )}
    </AnimatePresence>
  );
};

const ButtonWrapper = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: ${tokens.rPill}px;
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${tokens.shadowMd};
  z-index: 900;
  transition: background ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.brandDeep};
  }

  @media (max-width: 768px) {
    bottom: 1.25rem;
    right: 1.25rem;
    width: 44px;
    height: 44px;
  }
`;

export default ScrollToTopButton;
