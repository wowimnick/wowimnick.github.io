import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What if my insurance is not listed?",
    answer: "If your insurance provider is not listed, please contact our office. We may still be able to work with your insurance company or offer alternative payment options."
  },
  {
    question: "Do you accept Medicare?",
    answer: "Yes, we accept Traditional Medicare and work with several Medicare Advantage plans. Please check our list of accepted insurances or contact our office for more details."
  },
  {
    question: "How does insurance billing work for home health services?",
    answer: "Billing procedures for home health services vary depending on your insurance provider and plan. Typically, we will bill your insurance company directly for services provided. You may be responsible for copayments, deductibles, or coinsurance as required by your insurance plan."
  },
  {
    question: "What is the process for verifying my insurance coverage?",
    answer: "Our team will verify your insurance coverage before your first appointment. We'll contact your insurance provider to confirm your benefits and any out-of-pocket costs you may incur."
  },
  {
    question: "What if I don't have insurance?",
    answer: "We offer a Private Pay option for patients without insurance coverage. Please contact our office to discuss payment plans and options available to you."
  }
];

const InsuranceFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
  
    const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  
    return (
      <FAQWrapper ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <FAQList>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </FAQQuestion>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FAQAnswer>{faq.answer}</FAQAnswer>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FAQItem>
            </motion.div>
          ))}
        </FAQList>
      </FAQWrapper>
    );
  };

const FAQWrapper = styled.section`
  margin-bottom: 4rem;
    font-family: 'Poppins', sans-serif;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #4a90e2;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #333;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f7ff;
  }
`;

const FAQAnswer = styled.div`
  padding: 1rem;
  color: #666;
  line-height: 1.6;
`;

export default InsuranceFAQ;