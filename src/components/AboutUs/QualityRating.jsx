import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import '@fontsource/poppins';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';
import AccushieldBadge from '../shared/AccushieldBadge';

const QualityRating = () => {
  return (
    <RatingWrapper>
      <motion.div {...fadeUpProps()}>
        <RatingValue>5.0</RatingValue>
        <StarRow>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={28} fill={tokens.gold} stroke={tokens.gold} />
          ))}
        </StarRow>
        <SubText>Medicare Quality Rating · all 5 offices</SubText>
        <BadgeRow>
          <AccushieldBadge size="sm" />
        </BadgeRow>
      </motion.div>
    </RatingWrapper>
  );
};

const RatingWrapper = styled.section`
  font-family: ${tokens.font};
  padding: clamp(3rem, 8vw, 5rem) ${tokens.gutters};
  text-align: center;
  background: ${tokens.surface};
`;

const RatingValue = styled.div`
  font-size: clamp(3.5rem, 10vw, ${tokens.fs.display});
  font-weight: 700;
  color: ${tokens.ink};
  line-height: ${tokens.lh.tight};
  margin-bottom: 0.75rem;
`;

const StarRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
`;

const SubText = styled.p`
  font-size: ${tokens.fs.md};
  color: ${tokens.grey};
  margin: 0;
`;

const BadgeRow = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

export default QualityRating;
