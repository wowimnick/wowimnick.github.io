import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

const QualityRating = () => {
  const rating = 5;

  return (
    <RatingWrapper>
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <RatingContainer>
            <StarContainer>
              {[...Array(5)].map((_, index) => (
                <Star key={index}>★</Star>
              ))}
            </StarContainer>
            <RatingText>{rating}.0</RatingText>
            <SubText>Medicare Quality Rating • All 5 Offices</SubText>
          </RatingContainer>
        </motion.div>
      </ContentContainer>
    </RatingWrapper>
  );
};

const RatingWrapper = styled.section`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  padding: 3rem 0 2.5rem 0;
  border-bottom: 1px solid #e8eaed;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.div`
  font-size: 2rem;
  color: #ffd700;
  line-height: 1;
`;

const RatingText = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
`;

const SubText = styled.span`
  font-size: 0.95rem;
  color: #5f6368;
  font-weight: 400;
`;

export default QualityRating;