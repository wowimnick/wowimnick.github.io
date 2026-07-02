import React from 'react';
import styled from 'styled-components';
import { tokens } from '../../styles/tokens';

const ACCUSHIELD_URL = 'https://accushield.com/verified-alliance/';
const BADGE_SRC =
  'https://accushield.com/downloads/badges/accushield-verified-alliance-emblem-color.png';

const AccushieldBadge = ({ size = 'md' }) => {
  return (
    <BadgeLink
      href={ACCUSHIELD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Accushield Verified Alliance — learn more"
    >
      <BadgeImage
        src={BADGE_SRC}
        alt="Accushield Verified Alliance"
        $size={size}
        loading="lazy"
      />
    </BadgeLink>
  );
};

const BadgeLink = styled.a`
  display: inline-block;
  line-height: 0;
  transition: opacity ${tokens.dur.fast}s ease, transform ${tokens.dur.fast}s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${tokens.brand};
    outline-offset: 4px;
    border-radius: ${tokens.rSm}px;
  }
`;

const BadgeImage = styled.img`
  height: auto;
  width: ${({ $size }) => ($size === 'sm' ? '140px' : '180px')};
  max-width: 100%;
`;

export default AccushieldBadge;
