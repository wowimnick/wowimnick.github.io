import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';

const MissionStatement = () => {
  return (
    <MissionWrapper>
      <PullQuote {...fadeUpProps()}>
        &ldquo;To provide professional and quality services to patients in their homes, helping them achieve their highest potential in daily activities — delivered through skilled clinicians who understand the importance of comprehensive needs assessment.&rdquo;
      </PullQuote>
    </MissionWrapper>
  );
};

const MissionWrapper = styled.section`
  background: ${tokens.surfaceWarm};
  font-family: ${tokens.font};
  padding: clamp(3rem, 8vw, 5rem) ${tokens.gutters};
`;

const PullQuote = styled(motion.blockquote)`
  max-width: 720px;
  margin: 0 auto;
  font-size: clamp(1.15rem, 2.5vw, ${tokens.fs.xl});
  line-height: ${tokens.lh.loose};
  color: ${tokens.ink};
  border-left: 3px solid ${tokens.brand};
  padding-left: 1.5rem;
  font-style: normal;
  font-weight: 400;
`;

export default MissionStatement;
