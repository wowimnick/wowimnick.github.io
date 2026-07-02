import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';

const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', delay = 0 }) => {
  return (
    <HeaderWrapper $align={align}>
      {eyebrow && (
        <Eyebrow {...fadeUpProps(delay)}>{eyebrow}</Eyebrow>
      )}
      {title && (
        <Title {...fadeUpProps(delay + 0.1)}>{title}</Title>
      )}
      {subtitle && (
        <Subtitle $align={align} {...fadeUpProps(delay + 0.2)}>{subtitle}</Subtitle>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  text-align: ${({ $align }) => $align};
  margin-bottom: clamp(2rem, 5vw, 3rem);
  max-width: ${({ $align }) => ($align === 'center' ? '720px' : 'none')};
  margin-left: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  margin-right: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
`;

const Eyebrow = styled(motion.span)`
  display: block;
  font-family: ${tokens.font};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.brand};
  margin-bottom: 0.75rem;
`;

const Title = styled(motion.h2)`
  font-family: ${tokens.font};
  font-size: clamp(1.75rem, 4vw, ${tokens.fs.h2});
  font-weight: 700;
  line-height: ${tokens.lh.snug};
  color: ${tokens.ink};
  margin: 0 0 0.75rem;
`;

const Subtitle = styled(motion.p)`
  font-family: ${tokens.font};
  font-size: ${tokens.fs.md};
  line-height: ${tokens.lh.base};
  color: ${tokens.grey};
  margin: 0;
  max-width: 620px;
  margin-left: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
  margin-right: ${({ $align }) => ($align === 'center' ? 'auto' : '0')};
`;

export default SectionHeader;
