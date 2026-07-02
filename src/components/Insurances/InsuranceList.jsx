import React from 'react';
import '@fontsource/poppins';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Briefcase, Heart } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';

const insuranceCategories = [
  {
    name: 'Medicare & Medicare Advantage',
    icon: Shield,
    accent: tokens.brand,
    plans: [
      'Traditional Medicare',
      'United Health HMO/PPO/Dual complete',
      'Aetna Carelon',
      'Humana PPO / HMO',
      'Humana Island Dr / One home/ Dedicated Seniors',
      'Devoted (Integrated)',
      'Careplus (Integrated)',
      'Wellmed',
      'Blue Cross Blue Shield',
      'Gold Kidney',
    ],
  },
  {
    name: 'Commercial Insurance',
    icon: Briefcase,
    accent: tokens.brandDeep,
    plans: [
      'United Health',
      'UMR',
      'Aetna Homelink',
      'Blue Cross Carecentrix',
      'Cigna',
    ],
  },
  {
    name: 'Other Options',
    icon: Heart,
    accent: tokens.inkSoft,
    plans: [
      'Private Pay',
      'Long-term Care Insurance',
      'Haven Hospice (for PT only)',
    ],
  },
];

const InsuranceList = () => {
  return (
    <ListWrapper>
      <SectionHeader
        eyebrow="Accepted Plans"
        title="Insurance We Accept"
        subtitle="We partner with major providers across Medicare, commercial, and private pay options."
      />
      <CategoryGrid>
        {insuranceCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <CategoryCard key={category.name} {...fadeUpProps(staggerDelay(index))}>
              <CategoryHeader $accent={category.accent}>
                <Icon size={24} />
                <CategoryName>{category.name}</CategoryName>
              </CategoryHeader>
              <PlanList>
                {category.plans.map((plan) => (
                  <li key={plan}>{plan}</li>
                ))}
              </PlanList>
            </CategoryCard>
          );
        })}
      </CategoryGrid>
    </ListWrapper>
  );
};

const ListWrapper = styled.section`
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
  font-family: ${tokens.font};
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: ${tokens.maxW};
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: ${tokens.surface};
  border-radius: ${tokens.rLg}px;
  overflow: hidden;
  box-shadow: ${tokens.shadowSm};
  border: 1px solid ${tokens.hairline};
  transition: transform ${tokens.dur.fast}s ease, box-shadow ${tokens.dur.fast}s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadowMd};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 1.25rem;
  background: ${({ $accent }) => $accent};
  color: ${tokens.surface};

  svg {
    flex-shrink: 0;
  }
`;

const CategoryName = styled.h3`
  font-size: ${tokens.fs.md};
  font-weight: 600;
  line-height: ${tokens.lh.snug};
  margin: 0;
`;

const PlanList = styled.ul`
  list-style: none;
  padding: 1.25rem;
  margin: 0;

  li {
    font-size: ${tokens.fs.sm};
    color: ${tokens.inkSoft};
    padding: 0.55rem 0;
    border-bottom: 1px solid ${tokens.hairline};
    line-height: ${tokens.lh.base};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

export default InsuranceList;
