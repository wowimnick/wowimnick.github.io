import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { collapseTransition, fadeUpInitial, fadeUpAnimate, fadeUpTransition } from '../../styles/animations';
import '@fontsource/poppins';
import { Heart, Activity, Puzzle, MessageSquare, Home, UserPlus, Plus } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';

const services = [
  {
    icon: Heart,
    title: 'Skilled Nursing',
    description: 'Registered Nurses and Licensed Practical Nurses assist with medication management, perform wound care, IV care, and much more.',
    details: ['Comprehensive medication management and administration', 'Advanced wound, catheter, and ostomy care', 'IV therapy and infusion services', 'Chronic disease management and patient education', 'Post-surgical care and recovery support'],
  },
  {
    icon: Activity,
    title: 'Physical Therapy',
    description: 'Our therapists establish home exercise programs, improve functional ability, balance, strength, and conditioning.',
    details: ['Customized home exercise programs for rehabilitation', 'Balance and coordination improvement techniques', 'Strength training and muscle conditioning', 'Pain management strategies and therapies', 'Mobility enhancement and gait training'],
  },
  {
    icon: Puzzle,
    title: 'Occupational Therapy',
    description: 'Certified OTs and COTAs improve fine motor movements, coordination, and assist with improving activities of daily living (ADLs).',
    details: ['Fine motor skills development and hand therapy', 'Coordination enhancement exercises', 'ADL training for increased independence', 'Lymphedema and compression therapy', 'Adaptive equipment recommendations and usage training'],
  },
  {
    icon: MessageSquare,
    title: 'Speech Therapy',
    description: 'Highly-trained speech therapists and pathologists evaluate speech and swallowing, and improve communication and cognitive function.',
    details: ['Comprehensive speech and language evaluations', 'Swallowing assessments and therapy', 'Communication skills improvement strategies', 'Cognitive function enhancement exercises', 'Voice therapy and rehabilitation'],
  },
  {
    icon: UserPlus,
    title: 'Medical Social Work',
    description: 'These compassionate individuals assist with obtaining community resources, long-term care, meals, and much more.',
    details: ['Connection to local community resources and support', 'Long-term care planning and advice', 'Meal assistance program coordination', 'Emotional support and counseling services', 'Crisis intervention and management'],
  },
  {
    icon: Home,
    title: 'Home Health Aide',
    description: 'Personal care including showering, bathing, and grooming to ensure safety and promote independence.',
    details: ['Assisted showering and personal hygiene support', 'Safe bathing techniques and assistance', 'Grooming and dressing assistance', 'Continuous safety monitoring and fall prevention', 'Promotion of independence in daily activities'],
  },
];

const ServicesList = () => {
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({ ...prev, [index]: !prev[index] }));
    setActiveService(index);
  };

  return (
    <ServicesWrapper>
      <SectionHeader eyebrow="Services" title="Our Comprehensive Services" />
      <ServicesContainer>
        {isMobile ? (
          <MobileContainer>
            {services.map((service, index) => {
              const Icon = service.icon;
              const isOpen = openDropdowns[index];
              return (
                <MobileItem key={service.title} $open={isOpen}>
                  <DropdownButton onClick={() => toggleDropdown(index)}>
                    <ButtonContent>
                      <IconWrapper><Icon size={20} /></IconWrapper>
                      <span>{service.title}</span>
                    </ButtonContent>
                    <PlusIcon $open={isOpen}><Plus size={18} /></PlusIcon>
                  </DropdownButton>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={collapseTransition}
                      >
                        <DropdownContent>
                          <p>{service.description}</p>
                          <DetailsList>
                            {service.details.map((detail) => (
                              <DetailItem key={detail}>{detail}</DetailItem>
                            ))}
                          </DetailsList>
                        </DropdownContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MobileItem>
              );
            })}
          </MobileContainer>
        ) : (
          <>
            <ServiceMenu>
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <ServiceMenuItem
                    key={service.title}
                    onClick={() => setActiveService(index)}
                    $active={activeService === index}
                  >
                    <IconWrapper $active={activeService === index}><Icon size={20} /></IconWrapper>
                    <ServiceTitle $active={activeService === index}>{service.title}</ServiceTitle>
                  </ServiceMenuItem>
                );
              })}
            </ServiceMenu>
            <ServiceDetails $open>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={fadeUpInitial}
                  animate={fadeUpAnimate}
                  exit={fadeUpInitial}
                  transition={fadeUpTransition()}
                >
                  <h3>{services[activeService].title}</h3>
                  <p>{services[activeService].description}</p>
                  <DetailsList>
                    {services[activeService].details.map((detail) => (
                      <DetailItem key={detail}>{detail}</DetailItem>
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
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
  font-family: ${tokens.font};
  max-width: ${tokens.maxW};
  margin: 0 auto;
`;

const ServicesContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MobileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MobileItem = styled.div`
  border-bottom: 1px solid ${tokens.hairline};
  background: ${({ $open }) => ($open ? tokens.surfaceWarm : tokens.surface)};
  border-radius: ${({ $open }) => ($open ? `${tokens.rMd}px` : '0')};
  box-shadow: ${({ $open }) => ($open ? tokens.shadowSm : 'none')};
  overflow: hidden;
  transition: all ${tokens.dur.fast}s ease;
`;

const ServiceMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const ServiceMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: ${({ $active }) => ($active ? tokens.surfaceWarm : 'transparent')};
  border-radius: ${tokens.rMd}px;
  cursor: pointer;
  border-bottom: 1px solid ${tokens.hairline};
  transition: all ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.surfaceAlt};
  }
`;

const IconWrapper = styled.div`
  color: ${({ $active }) => ($active ? tokens.brand : tokens.grey)};
  display: flex;
  flex-shrink: 0;
`;

const ServiceTitle = styled.span`
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  color: ${({ $active }) => ($active ? tokens.ink : tokens.inkSoft)};
`;

const ServiceDetails = styled.div`
  flex: 2;
  background: ${tokens.surfaceWarm};
  border-radius: ${tokens.rMd}px;
  padding: 2rem;
  box-shadow: ${tokens.shadowSm};

  h3 {
    font-size: ${tokens.fs.xl};
    color: ${tokens.ink};
    margin: 0 0 0.75rem;
    font-weight: 700;
  }

  p {
    font-size: ${tokens.fs.md};
    color: ${tokens.grey};
    line-height: ${tokens.lh.loose};
    margin: 0 0 1.25rem;
  }
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DetailItem = styled.li`
  font-size: ${tokens.fs.sm};
  color: ${tokens.grey};
  margin-bottom: 0.6rem;
  padding-left: 1.25rem;
  position: relative;
  line-height: ${tokens.lh.base};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${tokens.brand};
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: transparent;
  color: ${tokens.ink};
  border: none;
  font-size: ${tokens.fs.md};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: ${tokens.font};
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PlusIcon = styled.span`
  color: ${tokens.brand};
  display: flex;
  transition: transform ${tokens.dur.fast}s ease;
  transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
`;

const DropdownContent = styled.div`
  padding: 0 1rem 1.25rem;

  p {
    font-size: ${tokens.fs.sm};
    color: ${tokens.grey};
    line-height: ${tokens.lh.loose};
    margin: 0 0 1rem;
  }
`;

export default ServicesList;
