import React, { useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import ServicesHero from '../components/Services/ServicesHero';
import ServiceOverview from '../components/Services/ServicesOverview';
import ServicesList from '../components/Services/ServicesList';
import ProgramsShowcase from '../components/Services/ProgramsShowcase';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <ServicesWrapper>
      <ServicesHero />
      <ContentContainer>
        <ServiceOverview />
        <ServicesList />
      </ContentContainer>
      <ProgramsShowcase />
      <ContentContainer>
      </ContentContainer>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled.div`
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

export default withPageTransition(Services);