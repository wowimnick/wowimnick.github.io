import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <CTAWrapper>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Ready to Experience Our Care?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Contact us today to learn more about our services or to schedule an appointment.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CTAButton to="/contact">Contact Us</CTAButton>
      </motion.div>
    </CTAWrapper>
  );
};

const CTAWrapper = styled.section`
  background: linear-gradient(135deg, #ff5722 0%, #ef1c1f 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 10px;
  margin: 4rem 0;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    margin: 3rem 0;
    border-radius: 8px;

    h2 {
      font-size: 2rem;
      margin-bottom: 0.875rem;
    }

    p {
      font-size: 1.05rem;
      margin-bottom: 1.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
    margin: 2rem 0;
    border-radius: 6px;

    h2 {
      font-size: 1.6rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #ff5722;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff9f0;
    color: #e64a19;
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 40px;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default ContactCTA;