import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { Heart, Stethoscope, Activity, Brain, Microscope, Download, UserPlus, Shield, FileText, Clipboard, Calendar } from 'lucide-react';

const programs = [
  { icon: <Heart />, name: 'Wound Care Program', file: 'wound-care-program.pdf' },
  { icon: <Stethoscope />, name: 'Chronic Pulmonary Care Program', file: 'pulmonary-care-program.pdf' },
  { icon: <Activity />, name: 'Cardiac Care Program (CHF, HTN, A-FIB, CAD)', file: 'cardiac-care-program.pdf' },
  { icon: <Brain />, name: "Alzheimer's and Dementia Therapy Program", file: 'alzheimers-dementia-program.pdf' },
  { icon: <Microscope />, name: 'Diabetes Program', file: 'diabetes-program.pdf' },
];

const coordinationAspects = [
  { icon: <UserPlus />, title: 'Intake' },
  { icon: <Shield />, title: 'Insurance' },
  { icon: <FileText />, title: 'Records' },
  { icon: <Clipboard />, title: 'Quality' },
  { icon: <Calendar />, title: 'Scheduling' },
];

const ProgramsShowcase = () => {
  return (
    <ShowcaseWrapper>
      <ContentContainer>
        <h2>Our Specialized Programs</h2>
        <ProgramsContainer>
          {programs.map((program, index) => (
            <Program
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProgramContent>
                <ProgramIcon>{program.icon}</ProgramIcon>
                <ProgramName>{program.name}</ProgramName>
              </ProgramContent>
              <DownloadButton href={`/path/to/${program.file}`} download>
                <Download size={16} />
                <span>Download PDF</span>
              </DownloadButton>
            </Program>
          ))}
        </ProgramsContainer>

        <CoordinatedCareSection>
          <CoordinatedCareDescription>
            Our services are seamlessly coordinated to ensure comprehensive care:
          </CoordinatedCareDescription>
          <CoordinationAspects>
            {coordinationAspects.map((aspect, index) => (
              <CoordinationAspect
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AspectIcon>{aspect.icon}</AspectIcon>
                <AspectTitle>{aspect.title}</AspectTitle>
              </CoordinationAspect>
            ))}
          </CoordinationAspects>
        </CoordinatedCareSection>
      </ContentContainer>
    </ShowcaseWrapper>
  );
};

const ShowcaseWrapper = styled.section`
  width: 100%;
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
  padding: 4rem 0;
  margin: 4rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
    margin: 3rem 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 0;
    margin: 2rem 0;
  }
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1400px;

  h2 {
    font-size: 2.5rem;
    color: #4a90e2;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const ProgramsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const Program = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    border-radius: 12px;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

const ProgramContent = styled.div`
  padding: 2rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.75rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const ProgramIcon = styled.div`
  font-size: 3rem;
  color: #4a90e2;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;

  svg {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    svg {
      width: 42px;
      height: 42px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;

    svg {
      width: 38px;
      height: 38px;
    }
  }
`;

const ProgramName = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
  line-height: 1.4;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.3;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: white;
  padding: 0.875rem 1rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #357abd;
  }

  svg {
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 0.75rem;
    font-size: 0.875rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const CoordinatedCareSection = styled.div`
  margin-top: 4rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 3rem;
  }

  @media (max-width: 480px) {
    margin-top: 2.5rem;
  }
`;

const CoordinatedCareDescription = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const CoordinationAspects = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const CoordinationAspect = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

const AspectIcon = styled.div`
  background-color: #4a90e2;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;

  ${CoordinationAspect}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 54px;
    height: 54px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const AspectTitle = styled.span`
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export default ProgramsShowcase;