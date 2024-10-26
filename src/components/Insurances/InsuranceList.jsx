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
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
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
  }
`;

const CategoryName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
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

    &:last-child {
      border-bottom: none;
    }
  }
`;

export default InsuranceList;