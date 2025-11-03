import React, { useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import HeroSection from '../components/AboutUs/HeroSection.jsx';
import MissionStatement from '../components/AboutUs/MissionStatement.jsx';
import CompanyHighlights from '../components/AboutUs/CompanyHighlights.jsx';
import QualityRating from '../components/AboutUs/QualityRating.jsx';
import ContactCTA from '../components/AboutUs/ContactCTA.jsx';
import AgencyValues from '../components/AboutUs/AgencyValues.jsx';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AboutUsWrapper>
      <HeroSection />
      <ContentContainer>
        <QualityRating />
        <CompanyHighlights />
        <AgencyValues />

        <MissionStatement />
      </ContentContainer>
      
      <ContentContainer>
        <ContactCTA />
      </ContentContainer>
    </AboutUsWrapper>
  );
};

const AboutUsWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default withPageTransition(AboutUs);