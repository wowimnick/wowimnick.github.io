import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '@fontsource/poppins';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { fadeUpProps, staggerDelay } from '../../styles/animations';
import { Heart, Stethoscope, Activity, Brain, Microscope, UserPlus, Shield, FileText, Clipboard, Calendar } from 'lucide-react';

const programs = [
  {
    icon: Heart,
    name: 'Wound Care Program',
    description: 'Specialized wound assessment, treatment, and healing protocols delivered by skilled nurses in the comfort of home.',
  },
  {
    icon: Stethoscope,
    name: 'Chronic Pulmonary Care Program',
    description: 'Comprehensive respiratory management including COPD education, breathing techniques, and medication oversight.',
  },
  {
    icon: Activity,
    name: 'Cardiac Care Program (CHF, HTN, A-FIB, CAD)',
    description: 'Heart failure and cardiac condition management with daily monitoring, education, and symptom tracking.',
  },
  {
    icon: Brain,
    name: "Alzheimer's and Dementia Therapy Program",
    description: 'Cognitive stimulation, safety planning, and caregiver support for patients with memory-related conditions.',
  },
  {
    icon: Microscope,
    name: 'Diabetes Program',
    description: 'Blood sugar monitoring, insulin management education, and dietary guidance for diabetic patients at home.',
  },
];

const coordinationAspects = [
  { icon: UserPlus, title: 'Intake' },
  { icon: Shield, title: 'Insurance' },
  { icon: FileText, title: 'Records' },
  { icon: Clipboard, title: 'Quality' },
  { icon: Calendar, title: 'Scheduling' },
];

const ProgramsShowcase = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <ShowcaseWrapper>
      <Inner>
        <SectionHeader eyebrow="Programs" title="Our Specialized Programs" />
        <ProgramsContainer>
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <Program key={program.name} {...fadeUpProps(staggerDelay(index))}>
                <ProgramContent>
                  <ProgramIcon><Icon size={28} /></ProgramIcon>
                  <ProgramName>{program.name}</ProgramName>
                </ProgramContent>
                <LearnBtn onClick={() => setSelectedProgram(program)}>Learn more</LearnBtn>
              </Program>
            );
          })}
        </ProgramsContainer>

        <CoordinatedCareSection>
          <CoordinatedCareDescription>
            Our services are seamlessly coordinated to ensure comprehensive care:
          </CoordinatedCareDescription>
          <CoordinationAspects>
            {coordinationAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              return (
                <CoordinationAspect key={aspect.title} {...fadeUpProps(staggerDelay(index))}>
                  <AspectIcon><Icon size={20} /></AspectIcon>
                  <AspectTitle>{aspect.title}</AspectTitle>
                </CoordinationAspect>
              );
            })}
          </CoordinationAspects>
        </CoordinatedCareSection>
      </Inner>

      <Modal
        title={selectedProgram?.name}
        open={!!selectedProgram}
        onCancel={() => setSelectedProgram(null)}
        footer={null}
        centered
      >
        <p style={{ color: tokens.grey, lineHeight: tokens.lh.loose, marginBottom: '1.5rem' }}>
          {selectedProgram?.description}
        </p>
        <ModalActions>
          <PrimaryAction onClick={() => { setSelectedProgram(null); navigate('/locations'); }}>
            Contact an Office
          </PrimaryAction>
        </ModalActions>
      </Modal>
    </ShowcaseWrapper>
  );
};

const ShowcaseWrapper = styled.section`
  background: ${tokens.surfaceAlt};
  font-family: ${tokens.font};
  padding: clamp(3rem, 8vw, 5rem) 0;
`;

const Inner = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: 0 ${tokens.gutters};
`;

const ProgramsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
`;

const Program = styled(motion.article)`
  background: ${tokens.surface};
  border-radius: ${tokens.rLg}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${tokens.shadowSm};
  transition: transform ${tokens.dur.base}s ease, box-shadow ${tokens.dur.base}s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadowMd};
  }
`;

const ProgramContent = styled.div`
  padding: 1.75rem;
  text-align: center;
  flex-grow: 1;
`;

const ProgramIcon = styled.div`
  color: ${tokens.brand};
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
`;

const ProgramName = styled.h3`
  font-size: ${tokens.fs.md};
  color: ${tokens.ink};
  margin: 0;
  font-weight: 600;
  line-height: ${tokens.lh.snug};
`;

const LearnBtn = styled.button`
  background: ${tokens.surfaceWarm};
  color: ${tokens.brand};
  border: none;
  border-top: 1px solid ${tokens.hairline};
  padding: 0.875rem;
  font-family: ${tokens.font};
  font-size: ${tokens.fs.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.surfaceAlt};
  }
`;

const CoordinatedCareSection = styled.div`
  text-align: center;
`;

const CoordinatedCareDescription = styled.p`
  font-size: ${tokens.fs.md};
  color: ${tokens.grey};
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
  gap: 0.5rem;
`;

const AspectIcon = styled.div`
  background: ${tokens.brand};
  color: ${tokens.surface};
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AspectTitle = styled.span`
  font-size: ${tokens.fs.sm};
  color: ${tokens.inkSoft};
  font-weight: 500;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PrimaryAction = styled.button`
  background: ${tokens.brand};
  color: ${tokens.surface};
  border: none;
  border-radius: ${tokens.rPill}px;
  padding: 0.65rem 1.25rem;
  font-family: ${tokens.font};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${tokens.brandDeep};
  }
`;

export default ProgramsShowcase;
