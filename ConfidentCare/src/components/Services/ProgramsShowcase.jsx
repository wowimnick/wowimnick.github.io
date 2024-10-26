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
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProgramContent>
                <ProgramIcon>{program.icon}</ProgramIcon>
                <ProgramName>{program.name}</ProgramName>
              </ProgramContent>
              <DownloadButton href={`/path/to/${program.file}`} download>
                <Download size={16} />
                Download PDF
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
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 0 2rem;

  h2 {
    font-size: 2.5rem;
    color: #4a90e2;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ProgramsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Program = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  width: 250px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProgramContent = styled.div`
  padding: 2rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProgramIcon = styled.div`
  font-size: 3rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const ProgramName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0;
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  transform: translateY(100%);
  opacity: 0;

  ${Program}:hover & {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover {
    background-color: #357abd;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const CoordinatedCareSection = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const CoordinatedCareTitle = styled.h3`
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const CoordinatedCareDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2rem;
`;

const CoordinationAspects = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CoordinationAspect = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 0.5rem;
`;

const AspectTitle = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

export default ProgramsShowcase;