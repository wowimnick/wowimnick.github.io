import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import '@fontsource/poppins';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Users, User, Briefcase, Heart, DollarSign } from 'lucide-react';

const insuranceCategories = [
  {
    name: "Medicare & Medicare Advantage",
    icon: <Shield size={32} />,
    color: "#4a90e2",
    plans: [
      "Traditional Medicare",
      "United Health HMO/PPO/Dual complete",
      "Aetna Carelon",
      "Humana PPO / HMO",
      "Humana Island Dr / One home/ Dedicated Seniors",
      "Devoted (Integrated)",
      "Careplus (Integrated)",
      "Wellmed",
      "Blue Cross Blue Shield",
      "Gold Kidney",
    ]
  },
  {
    name: "Commercial Insurance",
    icon: <Briefcase size={32} />,
    color: "#50c878",
    plans: [
      "United Health",
      "UMR",
      "Aetna Homelink",
      "Blue Cross Carecentrix",
      "Cigna",
    ]
  },
  {
    name: "Other Options",
    icon: <Heart size={32} />,
    color: "#ff6b6b",
    plans: [
      "Private Pay",
      "Long-term Care Insurance",
      "Haven Hospice (for PT only)",
    ]
  },
];

const InsuranceList = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
  
    return (
      <ListWrapper ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Accepted Insurance Plans
        </motion.h2>
        <CategoryGrid>
          {insuranceCategories.map((category, index) => (
            <CategoryCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryHeader style={{ backgroundColor: category.color }}>
                {category.icon}
                <CategoryName>{category.name}</CategoryName>
              </CategoryHeader>
              <PlanList>
                {category.plans.map((plan, planIndex) => (
                  <motion.li
                    key={planIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (planIndex * 0.05) }}
                  >
                    {plan}
                  </motion.li>
                ))}
              </PlanList>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </ListWrapper>
    );
  };

const ListWrapper = styled.section`
  margin-bottom: 4rem;
  font-family: 'Poppins', sans-serif;
  padding: 0 2rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 4rem;
    margin-top: 2rem;
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background-color: #4a90e2;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
    padding: 0 1rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 3rem;
      margin-top: 1.5rem;

      &::after {
        width: 80px;
        height: 2px;
        bottom: -8px;
      }
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
    padding: 0 0.75rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 2.5rem;
      margin-top: 1.25rem;

      &::after {
        width: 70px;
      }
    }
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const CategoryCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    border-radius: 10px;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: white;
  align-items: baseline;

  svg {
    margin-right: 1rem;
    transform: translateY(8px);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;

    svg {
      width: 28px;
      height: 28px;
      margin-right: 0.875rem;
      transform: translateY(6px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem;

    svg {
      width: 26px;
      height: 26px;
      margin-right: 0.75rem;
      transform: translateY(5px);
    }
  }
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

const PlanList = styled.ul`
  list-style-type: none;
  padding: 1.5rem;
  margin: 0;

  li {
    font-size: 1rem;
    color: #333;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    line-height: 1.4;

    &:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    li {
      font-size: 0.95rem;
      padding: 0.45rem 0;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    li {
      font-size: 0.9rem;
      padding: 0.4rem 0;
      line-height: 1.35;
    }
  }
`;

export default InsuranceList;