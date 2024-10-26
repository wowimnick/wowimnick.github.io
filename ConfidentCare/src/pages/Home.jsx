import React, { useEffect } from 'react';
import styled from 'styled-components';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import RatingsTestimonials from '../components/Home/RatingsTestimonials';
import OurTeam from '../components/Home/OurTeam';
import CTASection from '../components/Home/CTASection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeWrapper>
      <Hero />
      <MainContent>
        <Services />
      </MainContent>
      <RatingsTestimonials />
      <MainContent>
        <OurTeam />
        <CTASection />
      </MainContent>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100%;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default Home;