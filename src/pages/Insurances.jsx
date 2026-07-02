import React, { useEffect } from 'react';
import styled from 'styled-components';
import InsuranceHero from '../components/Insurances/InsuranceHero';
import InsuranceList from '../components/Insurances/InsuranceList';
import InsuranceFAQ from '../components/Insurances/InsuranceFAQ';
import CTABand from '../components/shared/CTABand';
import withPageTransition from '../components/withPageTransition';
import { useReferralModal } from '../context/ReferralModalContext';
import { tokens } from '../styles/tokens';

const InsurancesPage = () => {
  const { openModal } = useReferralModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <InsuranceHero />
      <ContentWrapper>
        <InsuranceList />
        <InsuranceFAQ />
      </ContentWrapper>
      <CTABand
        title="Questions about your coverage?"
        primaryLabel="Refer a Patient"
        onPrimaryClick={() => openModal()}
        secondaryLabel="Call (904) 733-1717"
        secondaryTel="(904) 733-1717"
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  font-family: ${tokens.font};
  background: ${tokens.surface};
`;

const ContentWrapper = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
`;

export default withPageTransition(InsurancesPage);
