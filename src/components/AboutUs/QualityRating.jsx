import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';

const QualityRating = () => {
  const rating = 4.8;
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;

  return (
    <RatingWrapper>
      <ContentContainer>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Quality Rating
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RatingContainer>
            <StarContainer>
              {[...Array(5)].map((_, index) => (
                <Star key={index}>
                  <svg viewBox="0 0 24 24" fill="#e0e0e0">
                    <path d="M12,1.5L9.8,8.4L2.5,8.7c-0.3,0-0.5,0.3-0.3,0.6l5.5,4.7l-1.7,7c-0.1,0.3,0.2,0.5,0.5,0.3L12,17.8l5.5,3.5 c0.3,0.2,0.6-0.1,0.5-0.3l-1.7-7l5.5-4.7c0.2-0.2,0.1-0.5-0.3-0.6l-7.3-0.3L12,1.5z" />
                  </svg>
                  <StarFill 
                    $percentage={
                      index < fullStars 
                        ? 100 
                        : index === fullStars 
                          ? partialStar * 100 
                          : 0
                    } 
                  >
                    <svg viewBox="0 0 24 24" fill="#ffd700">
                      <path d="M12,1.5L9.8,8.4L2.5,8.7c-0.3,0-0.5,0.3-0.3,0.6l5.5,4.7l-1.7,7c-0.1,0.3,0.2,0.5,0.5,0.3L12,17.8l5.5,3.5 c0.3,0.2,0.6-0.1,0.5-0.3l-1.7-7l5.5-4.7c0.2-0.2,0.1-0.5-0.3-0.6l-7.3-0.3L12,1.5z" />
                    </svg>
                  </StarFill>
                </Star>
              ))}
            </StarContainer>
            <RatingText>{rating} out of 5</RatingText>
          </RatingContainer>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Across all 5 offices
        </motion.p>
      </ContentContainer>
    </RatingWrapper>
  );
};

const RatingWrapper = styled.section`
  width: 100%;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  padding: 4rem 0;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Star = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  position: relative;
`;

const StarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: ${props => `inset(0 ${100 - props.percentage}% 0 0)`};
`;

const RatingText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #4a90e2;
  margin-top: 0.5rem;
`;

export default QualityRating;