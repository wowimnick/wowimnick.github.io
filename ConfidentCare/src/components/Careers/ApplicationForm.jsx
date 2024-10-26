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
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="resumeContent">Resume</label>
          <textarea
            id="resumeContent"
            rows="10"
            placeholder="Paste your resume content here"
            {...register('resumeContent', { required: 'Resume content is required' })}
          ></textarea>
          {errors.resumeContent && <ErrorMessage>{errors.resumeContent.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            rows="5"
            {...register('coverLetter', { required: 'Cover letter is required' })}
          ></textarea>
          {errors.coverLetter && <ErrorMessage>{errors.coverLetter.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <label htmlFor="additionalInfo">Additional Information (Optional)</label>
          <textarea
            id="additionalInfo"
            rows="3"
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
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #4a90e2;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, textarea {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4a90e2;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
`;

export default ApplicationForm;