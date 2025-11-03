import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ApplicationForm = ({ selectedJob }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("mxhVfavVsSqczEg8r");

      await emailjs.send(
        'service_8pz3fia',
        'template_e77gqjm',
        {
          to_email: 'apply@confidentcare.com',
          job_title: selectedJob.title,
          name: data.name,
          email: data.email,
          phone: data.phone,
          cover_letter: data.coverLetter,
          additional_info: data.additionalInfo,
          resume_content: data.resumeContent
        }
      );

      console.log('Application submitted successfully!');
      alert('Application submitted successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApplicationFormSection id="application-form">
      <h2>Apply for {selectedJob.title}</h2>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="resumeContent">Resume *</label>
          <textarea
            id="resumeContent"
            rows="10"
            placeholder="Paste your resume content here"
            {...register('resumeContent', { required: 'Resume content is required' })}
          ></textarea>
          {errors.resumeContent && <ErrorMessage>{errors.resumeContent.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="coverLetter">Cover Letter *</label>
          <textarea
            id="coverLetter"
            rows="5"
            placeholder="Tell us why you're a great fit for this position"
            {...register('coverLetter', { required: 'Cover letter is required' })}
          ></textarea>
          {errors.coverLetter && <ErrorMessage>{errors.coverLetter.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="additionalInfo">Additional Information (Optional)</label>
          <textarea
            id="additionalInfo"
            rows="3"
            placeholder="Any other information you'd like to share"
            {...register('additionalInfo')}
          ></textarea>
        </FormGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </LoadingSpinner>
          ) : (
            <>
              Submit Application <Send size={20} />
            </>
          )}
        </SubmitButton>
      </StyledForm>
    </ApplicationFormSection>
  );
};

const ApplicationFormSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #4a90e2;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem 1rem;
    border-radius: 8px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding: 1.25rem 0.75rem;
    border-radius: 6px;

    h2 {
      font-size: 1.35rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: 768px) {
    gap: 1.15rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
    font-size: 1rem;
  }

  input, textarea {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    background-color: white;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  @media (max-width: 768px) {
    label {
      font-size: 0.95rem;
      margin-bottom: 0.45rem;
    }

    input, textarea {
      padding: 0.65rem;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    label {
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }

    input, textarea {
      padding: 0.6rem;
      font-size: 0.9rem;
      border-radius: 4px;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.35rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.825rem;
    margin-top: 0.3rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 5px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background-color: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
    border-radius: 4px;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 20px;

  div {
    position: absolute;
    top: 5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 8px;
      animation: loading1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: loading2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: loading2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: loading3 0.6s infinite;
    }
  }

  @keyframes loading1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loading3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes loading2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  @media (max-width: 480px) {
    width: 70px;

    div {
      width: 11px;
      height: 11px;
    }
  }
`;

export default ApplicationForm;