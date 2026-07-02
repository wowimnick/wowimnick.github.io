import React, { useState } from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { tokens } from '../../styles/tokens';
import { collapseTransition } from '../../styles/animations';

const faqs = [
  {
    question: 'What if my insurance is not listed?',
    answer: 'If your insurance provider is not listed, please contact our office. We may still be able to work with your insurance company or offer alternative payment options.',
  },
  {
    question: 'Do you accept Medicare?',
    answer: 'Yes, we accept Traditional Medicare and work with several Medicare Advantage plans. Please check our list of accepted insurances or contact our office for more details.',
  },
  {
    question: 'How does insurance billing work for home health services?',
    answer: 'Billing procedures for home health services vary depending on your insurance provider and plan. Typically, we will bill your insurance company directly for services provided. You may be responsible for copayments, deductibles, or coinsurance as required by your insurance plan.',
  },
  {
    question: 'What is the process for verifying my insurance coverage?',
    answer: "Our team will verify your insurance coverage before your first appointment. We'll contact your insurance provider to confirm your benefits and any out-of-pocket costs you may incur.",
  },
  {
    question: "What if I don't have insurance?",
    answer: 'We offer a Private Pay option for patients without insurance coverage. Please contact our office to discuss payment plans and options available to you.',
  },
];

const InsuranceFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FAQWrapper>
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Common questions about insurance coverage and billing for home health services."
      />
      <FAQList>
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <FAQItem key={faq.question}>
              <FAQQuestion onClick={() => toggleFAQ(index)} aria-expanded={isOpen}>
                <QuestionText>{faq.question}</QuestionText>
                <IconWrapper $open={isOpen}>
                  <ChevronDown size={20} />
                </IconWrapper>
              </FAQQuestion>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={collapseTransition}
                  >
                    <FAQAnswer>{faq.answer}</FAQAnswer>
                  </motion.div>
                )}
              </AnimatePresence>
            </FAQItem>
          );
        })}
      </FAQList>
    </FAQWrapper>
  );
};

const FAQWrapper = styled.section`
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
  font-family: ${tokens.font};
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FAQItem = styled.div`
  background: ${tokens.surface};
  border-radius: ${tokens.rMd}px;
  box-shadow: ${tokens.shadowSm};
  border: 1px solid ${tokens.hairline};
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.125rem 1.25rem;
  cursor: pointer;
  font-family: ${tokens.font};
  font-weight: 600;
  font-size: ${tokens.fs.sm};
  color: ${tokens.ink};
  background: none;
  border: none;
  text-align: left;
  transition: background ${tokens.dur.fast}s ease;

  &:hover {
    background: ${tokens.surfaceAlt};
  }
`;

const QuestionText = styled.span`
  flex: 1;
  line-height: ${tokens.lh.base};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${tokens.brand};
  transition: transform ${tokens.dur.fast}s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

const FAQAnswer = styled.div`
  padding: 0 1.25rem 1.25rem;
  color: ${tokens.grey};
  line-height: ${tokens.lh.loose};
  font-size: ${tokens.fs.sm};
`;

export default InsuranceFAQ;
