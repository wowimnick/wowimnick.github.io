import React from 'react';
import styled from 'styled-components';
import { tokens } from '../../styles/tokens';

const BrandMark = ({ light = false, size = 'md' }) => {
  return (
    <MarkWrapper data-size={size}>
      <Tile>
        <TileLetter data-size={size}>C</TileLetter>
      </Tile>
      <TextBlock>
        <Line1 $light={light} data-size={size}>Confident Care</Line1>
        <Line2 $light={light} data-size={size}>of Florida</Line2>
      </TextBlock>
    </MarkWrapper>
  );
};

const MarkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  &[data-size='sm'] {
    gap: 0.5rem;
  }
`;

const Tile = styled.div`
  width: 28px;
  height: 28px;
  background: ${tokens.brand};
  border-radius: ${tokens.rSm}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${MarkWrapper}[data-size='sm'] & {
    width: 24px;
    height: 24px;
    border-radius: 8px;
  }

  ${MarkWrapper}[data-size='lg'] & {
    width: 36px;
    height: 36px;
  }
`;

const TileLetter = styled.span`
  color: ${tokens.surface};
  font-family: ${tokens.font};
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1;

  &[data-size='sm'] {
    font-size: 0.8rem;
  }

  &[data-size='lg'] {
    font-size: 1.15rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  letter-spacing: -0.01em;
`;

const Line1 = styled.span`
  font-family: ${tokens.font};
  font-weight: 700;
  font-size: 0.95rem;
  color: ${({ $light }) => ($light ? tokens.surface : tokens.ink)};

  &[data-size='sm'] {
    font-size: 0.85rem;
  }
`;

const Line2 = styled.span`
  font-family: ${tokens.font};
  font-weight: 600;
  font-size: 0.8rem;
  color: ${({ $light }) => ($light ? 'rgba(255,255,255,0.85)' : tokens.inkSoft)};

  &[data-size='sm'] {
    font-size: 0.75rem;
  }
`;

export default BrandMark;
