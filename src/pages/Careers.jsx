// --- START OF FILE Careers.jsx ---
import React, { useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import HeroBanner from '../components/Careers/HeroBanner';
import ApplicationForm from '../components/Careers/ApplicationForm';
import WhyWorkWithUs from '../components/Careers/WhyWorkWithUs';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CareersWrapper>
      <HeroBanner />
      <ContentSection>
        <IntroText>
          <h2>Join Our Team</h2>
          <p>We are always looking for compassionate, skilled professionals to join the Confident Care family. Please fill out the general application below to be considered for current and future openings.</p>
        </IntroText>
        <ApplicationForm />
      </ContentSection>
      <WhyWorkWithUs />
    </CareersWrapper>
  );
};

const CareersWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  background-color: #fcfcfc;
`;

const ContentSection = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.2rem 2rem;
  }
`;

const IntroText = styled.div`
  text-align: center;
  margin: 3rem auto;
  max-width: 700px;

  h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
  }
`;

export default withPageTransition(Careers);