import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <CTAWrapper ref={ref}>
      <ContentWrapper>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Experience Our Care?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover how our comprehensive services can improve your quality of life or that of your loved ones.
        </motion.p>
        <ButtonGroup>
          <Link to="/services">
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Our Services <ArrowRight size={20} />
            </CTAButton>
          </Link>
          <Link to="/locations">
            <CTAButton
              secondary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Contact Us
            </CTAButton>
          </Link>
        </ButtonGroup>
      </ContentWrapper>
    </CTAWrapper>
  );
};

const CTAWrapper = styled.section`
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin-bottom: 3rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0.75rem;
    margin-bottom: 2rem;
    border-radius: 6px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2rem;
      margin-bottom: 0.875rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.75rem;
      line-height: 1.5;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.6rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  a {
    color: ${props => props.secondary ? '#4a90e2' : 'white'};
    text-decoration: none;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const CTAButton = styled(motion.button)`
  background-color: ${props => props.secondary ? 'transparent' : '#4a90e2'};
  color: ${props => props.secondary ? '#4a90e2' : 'white'};
  border: ${props => props.secondary ? '2px solid #4a90e2' : 'none'};
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: ${props => props.secondary ? '#4a90e2' : '#357abd'};
    color: white;
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    justify-content: center;
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    padding: 0.6rem 1.15rem;
    font-size: 0.9rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default CTASection;
