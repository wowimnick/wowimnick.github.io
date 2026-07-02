import React, { useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import HeroBanner from '../components/Careers/HeroBanner';
import ApplicationForm from '../components/Careers/ApplicationForm';
import WhyWorkWithUs from '../components/Careers/WhyWorkWithUs';
import SectionHeader from '../components/shared/SectionHeader';
import { tokens } from '../styles/tokens';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CareersWrapper>
      <HeroBanner />
      <ContentSection>
        <SectionHeader
          eyebrow="Apply Now"
          title="Join Our Team"
          subtitle="We are always looking for compassionate, skilled professionals to join the Confident Care family. Fill out the general application below to be considered for current and future openings."
        />
        <ApplicationForm />
      </ContentSection>
      <WhyWorkWithUs />
    </CareersWrapper>
  );
};

const CareersWrapper = styled.div`
  font-family: ${tokens.font};
  color: ${tokens.ink};
  background: ${tokens.surface};
`;

const ContentSection = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
`;

export default withPageTransition(Careers);
