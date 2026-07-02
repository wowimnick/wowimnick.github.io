import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import '@fontsource/poppins';
import { useReferralModal } from '../../context/ReferralModalContext';
import { tokens } from '../../styles/tokens';
import { collapseTransition } from '../../styles/animations';

const extractCounties = (name) => {
  const match = name.match(/\(([^)]+)\)/);
  return match ? match[1] : '';
};

const extractOfficeName = (name) => name.replace(/\s*\([^)]+\)/, '');

const LocationsList = ({ locations, selectedLocation, onLocationSelect }) => {
  const [expandedId, setExpandedId] = useState(null);
  const { openModal } = useReferralModal();

  const toggleRow = (location) => {
    const isExpanding = expandedId !== location.id;
    setExpandedId(isExpanding ? location.id : null);
    onLocationSelect(location);
  };

  return (
    <ListWrapper>
      <ListTitle>Our Offices</ListTitle>
      {locations.map((location) => {
        const isExpanded = expandedId === location.id;
        const phoneDigits = location.phone.replace(/[^\d]/g, '');

        return (
          <Row key={location.id}>
            <RowHeader onClick={() => toggleRow(location)} aria-expanded={isExpanded}>
              <RowMain>
                <OfficeName>{extractOfficeName(location.name)}</OfficeName>
                <Counties>{extractCounties(location.name)}</Counties>
              </RowMain>
              <RowActions>
                <PhoneLink href={`tel:${phoneDigits}`} onClick={(e) => e.stopPropagation()}>
                  {location.phone}
                </PhoneLink>
                <Chevron $open={isExpanded}><ChevronDown size={18} /></Chevron>
              </RowActions>
            </RowHeader>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={collapseTransition}
                >
                  <ExpandedContent>
                    <DetailRow>{location.address}</DetailRow>
                    <DetailRow>Mon–Fri 8:00 AM – 5:00 PM</DetailRow>
                    <DetailRow>
                      <a href={`mailto:${location.email}`}>{location.email}</a>
                    </DetailRow>
                    <ReferBtn onClick={() => openModal(location.id)}>
                      Refer to this office
                    </ReferBtn>
                  </ExpandedContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Row>
        );
      })}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  width: 100%;
  font-family: ${tokens.font};

  @media (min-width: 768px) {
    flex: 1;
    min-width: 0;
    max-width: none;
  }

  @media (min-width: 1000px) {
    max-width: 50%;
  }
`;

const ListTitle = styled.h2`
  font-size: ${tokens.fs.xl};
  font-weight: 700;
  color: ${tokens.ink};
  margin: 0 0 1.25rem;
`;

const Row = styled.div`
  border-bottom: 1px solid ${tokens.hairline};
`;

const RowHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: ${tokens.font};

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const RowMain = styled.div`
  flex: 1;
`;

const OfficeName = styled.div`
  font-size: ${tokens.fs.md};
  font-weight: 600;
  color: ${tokens.ink};
  margin-bottom: 0.15rem;
`;

const Counties = styled.div`
  font-size: ${tokens.fs.sm};
  color: ${tokens.grey};
`;

const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 540px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PhoneLink = styled.a`
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  color: ${tokens.brand};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${tokens.brandDeep};
  }
`;

const Chevron = styled.span`
  color: ${tokens.grey};
  display: flex;
  transition: transform ${tokens.dur.fast}s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const ExpandedContent = styled.div`
  padding: 0.75rem 0.5rem 1.5rem;
`;

const DetailRow = styled.p`
  font-size: ${tokens.fs.sm};
  color: ${tokens.grey};
  line-height: ${tokens.lh.base};
  margin: 0 0 0.4rem;

  a {
    color: ${tokens.brand};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ReferBtn = styled.button`
  margin-top: 0.75rem;
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.6rem 1.25rem;
  font-family: ${tokens.font};
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${tokens.brandDeep};
  }
`;

export default LocationsList;
