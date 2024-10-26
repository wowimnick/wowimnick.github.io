import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import InsuranceHero from '../components/Insurances/InsuranceHero';
import InsuranceList from '../components/Insurances/InsuranceList';
import InsuranceFAQ from '../components/Insurances/InsuranceFAQ';
import withPageTransition from '../components/withPageTransition';

const InsurancesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      
  return (
    <PageWrapper>
      <InsuranceHero />
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InsuranceList />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InsuranceFAQ />
        </motion.div>
      </ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export default withPageTransition(InsurancesPage);