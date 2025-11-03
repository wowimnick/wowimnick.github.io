import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/poppins';
import { Heart, Activity, Puzzle, MessageSquare, Home, UserPlus, ChevronDown, ChevronUp } from 'lucide-react';

const services = [
  {
    icon: <Heart size={32} />,
    title: 'Skilled Nursing',
    description: 'Registered Nurses and Licensed Practical Nurses assist with medication management, perform wound care, IV care, and much more.',
    details: [
      'Comprehensive medication management and administration',
      'Advanced wound, catheter, and ostomy care',
      'IV therapy and infusion services',
      'Chronic disease management and patient education',
      'Post-surgical care and recovery support'
    ]
  },
  {
    icon: <Activity size={32} />,
    title: 'Physical Therapy',
    description: 'Our therapists establish home exercise programs, improve functional ability, balance, strength, and conditioning.',
    details: [
      'Customized home exercise programs for rehabilitation',
      'Balance and coordination improvement techniques',
      'Strength training and muscle conditioning',
      'Pain management strategies and therapies',
      'Mobility enhancement and gait training'
    ]
  },
  {
    icon: <Puzzle size={32} />,
    title: 'Occupational Therapy',
    description: 'Certified OTs and COTAs improve fine motor movements, coordination, and assist with improving activities of daily living (ADLs).',
    details: [
      'Fine motor skills development and hand therapy',
      'Coordination enhancement exercises',
      'ADL training for increased independence',
      'Lymphedema and compression therapy',
      'Adaptive equipment recommendations and usage training'
    ]
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'Speech Therapy',
    description: 'Highly-trained speech therapists and pathologists evaluate speech and swallowing, and improve communication and cognitive function.',
    details: [
      'Comprehensive speech and language evaluations',
      'Swallowing assessments and therapy',
      'Communication skills improvement strategies',
      'Cognitive function enhancement exercises',
      'Voice therapy and rehabilitation'
    ]
  },
  {
    icon: <UserPlus size={32} />,
    title: 'Medical Social Work',
    description: 'These compassionate individuals assist with obtaining community resources, long-term care, meals, and much more.',
    details: [
      'Connection to local community resources and support',
      'Long-term care planning and advice',
      'Meal assistance program coordination',
      'Emotional support and counseling services',
      'Crisis intervention and management'
    ]
  },
  {
    icon: <Home size={32} />,
    title: 'Home Health Aide',
    description: 'Personal care including showering, bathing, and grooming to ensure safety and promote independence.',
    details: [
      'Assisted showering and personal hygiene support',
      'Safe bathing techniques and assistance',
      'Grooming and dressing assistance',
      'Continuous safety monitoring and fall prevention',
      'Promotion of independence in daily activities'
    ]
  },
];

const ServicesList = () => {
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    setActiveService(index);
  };

  return (
    <ServicesWrapper>
      <h2>Our Comprehensive Services</h2>
      <ServicesContainer>
        {isMobile ? (
          <MobileContainer>
            {services.map((service, index) => (
              <MobileDropdown key={index}>
                <DropdownButton onClick={() => toggleDropdown(index)}>
                  <ButtonContent>
                    <IconWrapper>{service.icon}</IconWrapper>
                    <span>{service.title}</span>
                  </ButtonContent>
                  {openDropdowns[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </DropdownButton>
                <AnimatePresence>
                  {openDropdowns[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DropdownContent>
                        <p>{service.description}</p>
                        <DetailsList>
                          {service.details.map((detail, idx) => (
                            <DetailItem key={idx}>{detail}</DetailItem>
                          ))}
                        </DetailsList>
                      </DropdownContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </MobileDropdown>
            ))}
          </MobileContainer>
        ) : (
          <>
            <ServiceMenu>
              {services.map((service, index) => (
                <ServiceMenuItem
                  key={index}
                  onClick={() => setActiveService(index)}
                  $active={activeService === index}
                >
                  <IconWrapper $active={activeService === index}>{service.icon}</IconWrapper>
                  <ServiceTitle $active={activeService === index}>{service.title}</ServiceTitle>
                </ServiceMenuItem>
              ))}
            </ServiceMenu>
            <ServiceDetails>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>{services[activeService].title}</h3>
                  <p>{services[activeService].description}</p>
                  <DetailsList>
                    {services[activeService].details.map((detail, index) => (
                      <DetailItem key={index}>{detail}</DetailItem>
                    ))}
                  </DetailsList>
                </motion.div>
              </AnimatePresence>
            </ServiceDetails>
          </>
        )}
      </ServicesContainer>
    </ServicesWrapper>
  );
};

const ServicesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  font-family: 'Poppins', sans-serif;
  padding: 0 2rem;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #4a90e2;
    text-align: center;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    margin: 3rem 0;
    padding: 0 1rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    margin: 2rem 0;
    padding: 0 0.75rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1.25rem;
    }
  }
`;

const ServicesContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    gap: 0;
  }
`;

const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const ServiceMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const ServiceMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.$active ? '#4a90e2' : '#f8f9fa'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? '#4a90e2' : '#e9ecef'};
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.$active ? 'white' : '#4a90e2'};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 480px) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ServiceTitle = styled.span`
  font-size: 1.1rem;
  color: ${props => props.$active ? 'white' : '#333'};
  transition: color 0.3s ease;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ServiceDetails = styled.div`
  flex: 2;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.8rem;
    color: #4a90e2;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DetailItem = styled.li`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: '•';
    color: #4a90e2;
    font-size: 1.2rem;
    position: absolute;
    left: 0;
    top: -2px;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 0.65rem;
    padding-left: 1.25rem;
    line-height: 1.4;
  }
`;

const MobileDropdown = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    border-radius: 8px;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #f8f9fa;
  color: #333;
  border: none;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #e9ecef;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 1rem;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const DropdownContent = styled.div`
  background-color: white;
  padding: 1rem;

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;

    p {
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 0.875rem;
    }
  }
`;

export default ServicesList;