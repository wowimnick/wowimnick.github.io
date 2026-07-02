import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { tokens } from '../../styles/tokens';
import { fadeUpProps } from '../../styles/animations';

const CTABand = ({
  title = 'Ready to experience confident care?',
  primaryLabel = 'Refer a Patient',
  onPrimaryClick,
  secondaryLabel,
  secondaryHref,
  secondaryTel,
}) => {
  return (
    <Band>
      <Inner>
        <motion.h2 {...fadeUpProps()}>{title}</motion.h2>
        <ButtonRow>
          {onPrimaryClick && (
            <PrimaryBtn
              onClick={onPrimaryClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              {...fadeUpProps(0.15)}
            >
              {primaryLabel} <ArrowRight size={18} />
            </PrimaryBtn>
          )}
          {secondaryTel && (
            <SecondaryLink href={`tel:${secondaryTel.replace(/[^\d+]/g, '')}`} {...fadeUpProps(0.25)}>
              {secondaryLabel || secondaryTel}
            </SecondaryLink>
          )}
          {secondaryHref && !secondaryTel && (
            <SecondaryLink href={secondaryHref} {...fadeUpProps(0.25)}>
              {secondaryLabel}
            </SecondaryLink>
          )}
        </ButtonRow>
      </Inner>
    </Band>
  );
};

const Band = styled.section`
  background: ${tokens.surface};
  border-top: 1px solid ${tokens.hairline};
  padding: clamp(3rem, 8vw, 5rem) ${tokens.gutters};
  font-family: ${tokens.font};
`;

const Inner = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: clamp(1.75rem, 4vw, ${tokens.fs.h2});
    font-weight: 700;
    color: ${tokens.ink};
    margin: 0 0 1.75rem;
    line-height: ${tokens.lh.snug};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryBtn = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.85rem 1.75rem;
  font-family: ${tokens.font};
  font-size: ${tokens.fs.md};
  font-weight: 600;
  cursor: pointer;
  transition: background ${tokens.dur.fast}s ease, box-shadow ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.brandDeep};
    box-shadow: ${tokens.shadowSm};
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
  }
`;

const SecondaryLink = styled(motion.a)`
  color: ${tokens.inkSoft};
  font-family: ${tokens.font};
  font-size: ${tokens.fs.md};
  font-weight: 600;
  text-decoration: none;
  padding: 0.85rem 1.25rem;
  border: 1px solid ${tokens.hairline};
  border-radius: ${tokens.rPill}px;
  transition: background ${tokens.dur.fast}s ease, border-color ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.surfaceAlt};
    border-color: ${tokens.greyLight};
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    text-align: center;
  }
`;

export default CTABand;
