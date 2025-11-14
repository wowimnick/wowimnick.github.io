import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Send, ChevronLeft, ChevronRight, User, Briefcase, FileText, CheckCircle, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApplicationForm = ({ selectedJob }) => {
  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm({
    mode: 'onChange'
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAttestationModal, setShowAttestationModal] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    resume: null,
    license: null,
    cpr: null,
    ssCard: null
  });

  const steps = [
    { 
      title: 'Personal Information', 
      icon: <User size={20} />,
      fields: ['name', 'dob', 'email', 'phone', 'contactMethod']
    },
    { 
      title: 'Position Details', 
      icon: <Briefcase size={20} />,
      fields: ['position', 'office', 'startDate', 'employmentType', 'floridaLicense', 'yearsExperience', 'whyGoodFit']
    },
    { 
      title: 'Employment & Documents', 
      icon: <FileText size={20} />,
      fields: ['workedBefore', 'previousDates', 'hasContacts', 'contactDetails', 'previousEmployer', 'previousPhone', 'previousPosition', 'referenceName', 'referencePhone', 'referenceEmail', 'coverLetter']
    }
  ];

  // File upload handler
  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFiles(prev => ({
          ...prev,
          [fileType]: {
            name: file.name,
            data: reader.result,
            size: file.size
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (fileType) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
    // Clear the file input
    const input = document.getElementById(`${fileType}-input`);
    if (input) input.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const validateStep = async (stepIndex) => {
    const fieldsToValidate = steps[stepIndex].fields;
    const result = await trigger(fieldsToValidate);
    
    // Additional validation for file uploads on last step
    if (stepIndex === 2) {
      const missingFiles = [];
      if (!uploadedFiles.resume) missingFiles.push('Resume');
      if (!uploadedFiles.license) missingFiles.push('Professional License');
      if (!uploadedFiles.cpr) missingFiles.push('CPR/BLS Card');
      if (!uploadedFiles.ssCard) missingFiles.push('Social Security Card');
      
      if (missingFiles.length > 0) {
        alert(`Please upload the following required documents:\n• ${missingFiles.join('\n• ')}`);
        return false;
      }
    }
    
    return result;
  };

  const handleNext = async () => {
    const isStepValid = await validateStep(currentStep);
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to form section smoothly
      const formSection = document.getElementById('application-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to form section smoothly
      const formSection = document.getElementById('application-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const onSubmit = async (data) => {
    // Final validation check for files
    const missingFiles = [];
    if (!uploadedFiles.resume) missingFiles.push('Resume');
    if (!uploadedFiles.license) missingFiles.push('Professional License');
    if (!uploadedFiles.cpr) missingFiles.push('CPR/BLS Card');
    if (!uploadedFiles.ssCard) missingFiles.push('Social Security Card');
    
    if (missingFiles.length > 0) {
      alert(`Please upload the following required documents:\n• ${missingFiles.join('\n• ')}`);
      return;
    }

    // Store application data and show attestation modal
    setApplicationData(data);
    setShowAttestationModal(true);
  };

  const handleAttestationSubmit = async (attestationData) => {
    setIsLoading(true);
    
    try {
      // Prepare the complete application payload with attestation
      const completePayload = {
        // Application Data
        application: {
          job_title: selectedJob.title,
          // Personal Information
          name: applicationData.name,
          dob: applicationData.dob,
          email: applicationData.email,
          phone: applicationData.phone,
          contact_method: applicationData.contactMethod,
          // Position Details
          position: applicationData.position,
          office: applicationData.office,
          start_date: applicationData.startDate,
          employment_type: applicationData.employmentType,
          florida_license: applicationData.floridaLicense,
          years_experience: applicationData.yearsExperience,
          why_good_fit: applicationData.whyGoodFit,
          // Employment History
          worked_before: applicationData.workedBefore,
          previous_dates: applicationData.previousDates || 'N/A',
          has_contacts: applicationData.hasContacts,
          contact_details: applicationData.contactDetails || 'N/A',
          previous_employer: applicationData.previousEmployer,
          previous_phone: applicationData.previousPhone,
          previous_position: applicationData.previousPosition,
          // References
          reference_name: applicationData.referenceName,
          reference_phone: applicationData.referencePhone,
          reference_email: applicationData.referenceEmail,
          // Cover Letter
          cover_letter: applicationData.coverLetter,
          // Uploaded Files
          files: {
            resume: {
              name: uploadedFiles.resume.name,
              size: uploadedFiles.resume.size,
              data: uploadedFiles.resume.data
            },
            license: {
              name: uploadedFiles.license.name,
              size: uploadedFiles.license.size,
              data: uploadedFiles.license.data
            },
            cpr: {
              name: uploadedFiles.cpr.name,
              size: uploadedFiles.cpr.size,
              data: uploadedFiles.cpr.data
            },
            ssCard: {
              name: uploadedFiles.ssCard.name,
              size: uploadedFiles.ssCard.size,
              data: uploadedFiles.ssCard.data
            }
          }
        },
        // Background Screening Attestation
        attestation: attestationData
      };

      console.log('=== COMPLETE APPLICATION PAYLOAD ===');
      console.log(JSON.stringify(completePayload, null, 2));
      console.log('=== END PAYLOAD ===');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Application and attestation submitted successfully!');
      setShowAttestationModal(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <ApplicationFormSection id="application-form">
        <SuccessMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={64} color="#4caf50" />
          </motion.div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying for the {selectedJob.title} position.</p>
          <p>Our office managers will review your application and all uploaded documents, then contact you about the next steps in the hiring process.</p>
          <ImportantNote>
            <strong>Next Step:</strong> All Confident Care employees must pass a background check prior to seeing patients. Your background screening attestation has been received.
          </ImportantNote>
        </SuccessMessage>
      </ApplicationFormSection>
    );
  }

  // Attestation Modal Component
  const AttestationModal = () => {
    const [attestationData, setAttestationData] = useState({
      employeeName: applicationData?.name || '',
      signature: '',
      title: '',
      date: new Date().toISOString().split('T')[0],
      agreeToTerms: false,
      priorScreening: false,
      priorScreeningPurpose: ''
    });

    const handleAttestationChange = (field, value) => {
      setAttestationData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmitAttestation = (e) => {
      e.preventDefault();
      
      if (!attestationData.signature) {
        alert('Please provide your signature (full name)');
        return;
      }

      if (!attestationData.agreeToTerms) {
        alert('You must agree to the attestation statement to proceed');
        return;
      }

      handleAttestationSubmit(attestationData);
    };

    if (!showAttestationModal) return null;

    return (
      <ModalOverlay
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <ModalHeader>
            <h2>Background Screening Attestation</h2>
            <p>Required for all healthcare employees in Florida</p>
          </ModalHeader>

          <ModalBody>
            <AttestationText>
              <h3>Background Screening Compliance</h3>
              <p>Florida law requires all healthcare employees to complete background screening and attest to meeting employment requirements.</p>
              
              <ImportantNote style={{ marginTop: '1rem' }}>
                <strong>Official Form:</strong> This attestation is based on AHCA Form 3100-0008. 
                <a 
                  href="https://ahca.myflorida.com/content/download/26444/file/Attestation%20of%20%20Compliance%20with%20Background%20Screening%20Requirements%20AHCA%20Form%203100-0008%20July%202024%20%282%29.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#4a90e2', marginLeft: '0.5rem', textDecoration: 'underline' }}
                >
                  View Complete Official Form
                </a>
              </ImportantNote>

              <Divider style={{ margin: '1.5rem 0' }} />

              <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: '#2c3e50' }}>Attestation Statement</h4>
              <p style={{ marginBottom: '1rem' }}><strong>Under penalty of perjury</strong>, I hereby attest that:</p>
              
              <OffenseList>
                <li>I have <strong>not been arrested for, found guilty of, or entered a plea of nolo contendere or guilty</strong> to any disqualifying offense under Florida Statutes sections <strong>435.04</strong>, <strong>408.809</strong>, and <strong>741.28</strong></li>
                <li>This includes but is not limited to: child abuse/neglect, sexual misconduct, assault, battery, domestic violence, drug-related felonies, fraud, theft, and crimes against vulnerable persons</li>
                <li>I do not have any arrest awaiting final disposition for any disqualifying offense</li>
                <li>I agree to <strong>immediately inform Confident Care of Florida</strong> if I am arrested or convicted of any disqualifying offense while employed</li>
                <li>I understand that all Confident Care employees must pass a Level 2 background screening prior to patient contact</li>
              </OffenseList>
            </AttestationText>

            <AttestationForm onSubmit={handleSubmitAttestation}>
              <FormGroup>
                <label htmlFor="employeeName">Employee/Contractor Name *</label>
                <input
                  type="text"
                  id="employeeName"
                  value={attestationData.employeeName}
                  onChange={(e) => handleAttestationChange('employeeName', e.target.value)}
                  required
                  readOnly
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <label htmlFor="title">Position/Title Applying For *</label>
                  <input
                    type="text"
                    id="title"
                    value={attestationData.title || applicationData?.position || ''}
                    onChange={(e) => handleAttestationChange('title', e.target.value)}
                    placeholder="e.g., Registered Nurse"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    value={attestationData.date}
                    onChange={(e) => handleAttestationChange('date', e.target.value)}
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label htmlFor="signature">Electronic Signature (Type Full Name) *</label>
                <input
                  type="text"
                  id="signature"
                  value={attestationData.signature}
                  onChange={(e) => handleAttestationChange('signature', e.target.value)}
                  placeholder="Type your full legal name"
                  required
                  style={{ fontFamily: 'Brush Script MT, cursive', fontSize: '1.2rem' }}
                />
                <span style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem', display: 'block' }}>
                  By typing your name above, you are providing your legal electronic signature
                </span>
              </FormGroup>

              <Divider />

              <CheckboxGroup style={{ marginBottom: '1.5rem' }}>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={attestationData.agreeToTerms}
                    onChange={(e) => handleAttestationChange('agreeToTerms', e.target.checked)}
                    required
                  />
                  <span>
                    <strong>I certify that I have read and understand the attestation statement above.</strong> I acknowledge that this attestation is made under penalty of perjury under the laws of the State of Florida, and that any false statement may result in termination of employment and/or criminal prosecution.
                  </span>
                </CheckboxLabel>
                {errors.agreeToTerms && <ErrorMessage>You must agree to proceed</ErrorMessage>}
              </CheckboxGroup>

              <SubSectionTitle style={{ fontSize: '1rem', color: '#666' }}>Additional Information (Optional)</SubSectionTitle>
              
              <CheckboxGroup>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    checked={attestationData.priorScreening}
                    onChange={(e) => handleAttestationChange('priorScreening', e.target.checked)}
                  />
                  <span>I have completed Level 2 background screening within the previous 5 years</span>
                </CheckboxLabel>
              </CheckboxGroup>

              {attestationData.priorScreening && (
                <FormGroup
                  as={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label htmlFor="priorScreeningPurpose">Purpose of Prior Screening</label>
                  <input
                    type="text"
                    id="priorScreeningPurpose"
                    value={attestationData.priorScreeningPurpose}
                    onChange={(e) => handleAttestationChange('priorScreeningPurpose', e.target.value)}
                    placeholder="e.g., Previous healthcare employment at [Facility Name]"
                  />
                </FormGroup>
              )}

              <ModalFooter>
                <NavButton
                  type="button"
                  onClick={() => setShowAttestationModal(false)}
                  $secondary
                  disabled={isLoading}
                >
                  <ChevronLeft size={20} />
                  Back to Application
                </NavButton>
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
                      Submit Complete Application <Send size={20} />
                    </>
                  )}
                </SubmitButton>
              </ModalFooter>
            </AttestationForm>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  };

  return (
    <ApplicationFormSection id="application-form">
      <AttestationModal />
      <FormHeader>
        <h2>Apply for {selectedJob.title}</h2>
        <p>Please complete all sections of this application</p>
      </FormHeader>

      <StepperContainer>
        {steps.map((step, index) => (
          <StepItem key={index} $active={index === currentStep} $completed={index < currentStep}>
            <motion.div
              initial={false}
              animate={{
                scale: index === currentStep ? 1.05 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <StepCircle 
                $active={index === currentStep} 
                $completed={index < currentStep}
                as={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {index < currentStep ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </StepCircle>
            </motion.div>
            <StepLabel 
              $active={index === currentStep}
              as={motion.span}
              initial={false}
              animate={{
                color: index === currentStep ? '#4a90e2' : index < currentStep ? '#4caf50' : '#666',
                fontWeight: index === currentStep ? 600 : 500
              }}
            >
              {step.title}
            </StepLabel>
            {index < steps.length - 1 && (
              <StepConnector 
                $completed={index < currentStep}
                as={motion.div}
                initial={false}
                animate={{
                  backgroundColor: index < currentStep ? '#4caf50' : '#e0e0e0'
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </StepItem>
        ))}
      </StepperContainer>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <StepContent
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle>Personal Information</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter your full name"
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="dob">Date of Birth *</label>
                <input
                  type="date"
                  id="dob"
                  {...register('dob', { required: 'Date of birth is required' })}
                />
                {errors.dob && <ErrorMessage>{errors.dob.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label htmlFor="email">Email Address *</label>
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
                  placeholder="your.email@example.com"
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label htmlFor="contactMethod">Preferred Contact Method *</label>
              <select
                id="contactMethod"
                {...register('contactMethod', { required: 'Please select a contact method' })}
              >
                <option value="">Select method</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
              {errors.contactMethod && <ErrorMessage>{errors.contactMethod.message}</ErrorMessage>}
            </FormGroup>
          </StepContent>
        )}

        {/* Step 2: Position Details */}
        {currentStep === 1 && (
          <StepContent
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle>Position Details</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <label htmlFor="position">Position Applying For *</label>
                <select
                  id="position"
                  {...register('position', { required: 'Please select a position' })}
                >
                  <option value="">Select position</option>
                  <option value="RN">Registered Nurse (RN)</option>
                  <option value="LPN">Licensed Practical Nurse (LPN)</option>
                  <option value="PT">Physical Therapist (PT)</option>
                  <option value="PTA">Physical Therapist Assistant (PTA)</option>
                  <option value="OT">Occupational Therapist (OT)</option>
                  <option value="OTA">Occupational Therapist Assistant (OTA)</option>
                  <option value="ST">Speech Therapist (ST)</option>
                  <option value="HHA">Home Health Aide (HHA)</option>
                </select>
                {errors.position && <ErrorMessage>{errors.position.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="office">Office Location *</label>
                <select
                  id="office"
                  {...register('office', { required: 'Please select an office' })}
                >
                  <option value="">Select office</option>
                  <option value="Jacksonville">Jacksonville</option>
                  <option value="Palm Coast">Palm Coast</option>
                  <option value="South Florida">South Florida</option>
                </select>
                {errors.office && <ErrorMessage>{errors.office.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label htmlFor="startDate">Date Available to Start *</label>
                <input
                  type="date"
                  id="startDate"
                  {...register('startDate', { required: 'Start date is required' })}
                />
                {errors.startDate && <ErrorMessage>{errors.startDate.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="employmentType">Employment Type *</label>
                <select
                  id="employmentType"
                  {...register('employmentType', { required: 'Please select employment type' })}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
                {errors.employmentType && <ErrorMessage>{errors.employmentType.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label htmlFor="floridaLicense">Licensed to work in Florida? *</label>
                <select
                  id="floridaLicense"
                  {...register('floridaLicense', { required: 'Please select an option' })}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.floridaLicense && <ErrorMessage>{errors.floridaLicense.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="yearsExperience">Years of Experience in Field *</label>
                <input
                  type="number"
                  id="yearsExperience"
                  min="0"
                  step="0.5"
                  {...register('yearsExperience', { 
                    required: 'Years of experience is required',
                    min: { value: 0, message: 'Must be 0 or greater' }
                  })}
                  placeholder="e.g., 2.5"
                />
                {errors.yearsExperience && <ErrorMessage>{errors.yearsExperience.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label htmlFor="whyGoodFit">What makes you a good candidate for this position? *</label>
              <textarea
                id="whyGoodFit"
                rows="4"
                {...register('whyGoodFit', { required: 'Please tell us about yourself' })}
                placeholder="Describe your skills, experience, and what makes you a great fit for this role..."
              ></textarea>
              {errors.whyGoodFit && <ErrorMessage>{errors.whyGoodFit.message}</ErrorMessage>}
            </FormGroup>
          </StepContent>
        )}

        {/* Step 3: Employment & Documents */}
        {currentStep === 2 && (
          <StepContent
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle>Previous Employment</SectionTitle>
            
            <FormRow>
              <FormGroup>
                <label htmlFor="workedBefore">Have you worked for Confident Care before? *</label>
                <select
                  id="workedBefore"
                  {...register('workedBefore', { required: 'Please select an option' })}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.workedBefore && <ErrorMessage>{errors.workedBefore.message}</ErrorMessage>}
              </FormGroup>

              {watch('workedBefore') === 'yes' && (
                <FormGroup
                  as={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="previousDates">When and for how long?</label>
                  <input
                    type="text"
                    id="previousDates"
                    {...register('previousDates')}
                    placeholder="e.g., Jan 2020 - Jun 2021"
                  />
                </FormGroup>
              )}
            </FormRow>

            <FormRow>
              <FormGroup>
                <label htmlFor="hasContacts">Do you have contacts within Confident Care? *</label>
                <select
                  id="hasContacts"
                  {...register('hasContacts', { required: 'Please select an option' })}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasContacts && <ErrorMessage>{errors.hasContacts.message}</ErrorMessage>}
              </FormGroup>

              {watch('hasContacts') === 'yes' && (
                <FormGroup
                  as={motion.div}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="contactDetails">Contact Details</label>
                  <input
                    type="text"
                    id="contactDetails"
                    {...register('contactDetails')}
                    placeholder="Name and relationship"
                  />
                </FormGroup>
              )}
            </FormRow>

            <Divider />
            <SubSectionTitle>Previous Employer</SubSectionTitle>

            <FormRow>
              <FormGroup>
                <label htmlFor="previousEmployer">Company/Employer Name *</label>
                <input
                  type="text"
                  id="previousEmployer"
                  {...register('previousEmployer', { required: 'Previous employer is required' })}
                  placeholder="Company name"
                />
                {errors.previousEmployer && <ErrorMessage>{errors.previousEmployer.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="previousPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="previousPhone"
                  {...register('previousPhone', { required: 'Phone number is required' })}
                  placeholder="(123) 456-7890"
                />
                {errors.previousPhone && <ErrorMessage>{errors.previousPhone.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label htmlFor="previousPosition">Position Held & Dates of Employment *</label>
              <input
                type="text"
                id="previousPosition"
                {...register('previousPosition', { required: 'Position and dates are required' })}
                placeholder="e.g., RN, Jan 2020 - Dec 2022"
              />
              {errors.previousPosition && <ErrorMessage>{errors.previousPosition.message}</ErrorMessage>}
            </FormGroup>

            <Divider />
            <SubSectionTitle>Reference</SubSectionTitle>
            <InfoBox>
              For verbal references, a supervisor will contact the reference via phone to verify your employment, quality of work, attendance, cooperation, and dependability.
            </InfoBox>

            <FormRow>
              <FormGroup>
                <label htmlFor="referenceName">Reference Name *</label>
                <input
                  type="text"
                  id="referenceName"
                  {...register('referenceName', { required: 'Reference name is required' })}
                  placeholder="Full name"
                />
                {errors.referenceName && <ErrorMessage>{errors.referenceName.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="referencePhone">Reference Phone *</label>
                <input
                  type="tel"
                  id="referencePhone"
                  {...register('referencePhone', { required: 'Reference phone is required' })}
                  placeholder="(123) 456-7890"
                />
                {errors.referencePhone && <ErrorMessage>{errors.referencePhone.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label htmlFor="referenceEmail">Reference Email *</label>
              <input
                type="email"
                id="referenceEmail"
                {...register('referenceEmail', { 
                  required: 'Reference email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                })}
                placeholder="reference@example.com"
              />
              {errors.referenceEmail && <ErrorMessage>{errors.referenceEmail.message}</ErrorMessage>}
            </FormGroup>

            <Divider />
            <SubSectionTitle>Cover Letter & Documents</SubSectionTitle>

            <FormGroup>
              <label htmlFor="coverLetter">Cover Letter *</label>
              <textarea
                id="coverLetter"
                rows="5"
                {...register('coverLetter', { required: 'Cover letter is required' })}
                placeholder="Tell us why you're interested in this position and what you can bring to our team..."
              ></textarea>
              {errors.coverLetter && <ErrorMessage>{errors.coverLetter.message}</ErrorMessage>}
            </FormGroup>

            <Divider />
            <SubSectionTitle>Upload Required Documents</SubSectionTitle>
            <InfoBox>
              <strong>Required:</strong> Please upload all documents below (PDF, DOC, DOCX, JPG, PNG). Maximum file size: 5MB per file.
            </InfoBox>

            {/* Resume Upload */}
            <FileUploadGroup>
              <FileUploadLabel>
                <Upload size={20} />
                <span>Resume / CV *</span>
              </FileUploadLabel>
              <input
                type="file"
                id="resume-input"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'resume')}
                style={{ display: 'none' }}
              />
              <FileUploadButton
                type="button"
                onClick={() => document.getElementById('resume-input').click()}
                $hasFile={!!uploadedFiles.resume}
              >
                {uploadedFiles.resume ? (
                  <>
                    <CheckCircle size={18} />
                    <span>{uploadedFiles.resume.name}</span>
                    <FileSize>({formatFileSize(uploadedFiles.resume.size)})</FileSize>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Choose File</span>
                  </>
                )}
              </FileUploadButton>
              {uploadedFiles.resume && (
                <RemoveButton
                  type="button"
                  onClick={() => removeFile('resume')}
                  as={motion.button}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </RemoveButton>
              )}
            </FileUploadGroup>

            {/* Professional License Upload */}
            <FileUploadGroup>
              <FileUploadLabel>
                <Upload size={20} />
                <span>Professional License *</span>
              </FileUploadLabel>
              <input
                type="file"
                id="license-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, 'license')}
                style={{ display: 'none' }}
              />
              <FileUploadButton
                type="button"
                onClick={() => document.getElementById('license-input').click()}
                $hasFile={!!uploadedFiles.license}
              >
                {uploadedFiles.license ? (
                  <>
                    <CheckCircle size={18} />
                    <span>{uploadedFiles.license.name}</span>
                    <FileSize>({formatFileSize(uploadedFiles.license.size)})</FileSize>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Choose File</span>
                  </>
                )}
              </FileUploadButton>
              {uploadedFiles.license && (
                <RemoveButton
                  type="button"
                  onClick={() => removeFile('license')}
                  as={motion.button}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </RemoveButton>
              )}
            </FileUploadGroup>

            {/* CPR/BLS Card Upload */}
            <FileUploadGroup>
              <FileUploadLabel>
                <Upload size={20} />
                <span>Valid CPR/BLS Card *</span>
              </FileUploadLabel>
              <input
                type="file"
                id="cpr-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, 'cpr')}
                style={{ display: 'none' }}
              />
              <FileUploadButton
                type="button"
                onClick={() => document.getElementById('cpr-input').click()}
                $hasFile={!!uploadedFiles.cpr}
              >
                {uploadedFiles.cpr ? (
                  <>
                    <CheckCircle size={18} />
                    <span>{uploadedFiles.cpr.name}</span>
                    <FileSize>({formatFileSize(uploadedFiles.cpr.size)})</FileSize>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Choose File</span>
                  </>
                )}
              </FileUploadButton>
              {uploadedFiles.cpr && (
                <RemoveButton
                  type="button"
                  onClick={() => removeFile('cpr')}
                  as={motion.button}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </RemoveButton>
              )}
            </FileUploadGroup>

            {/* Social Security Card Upload */}
            <FileUploadGroup>
              <FileUploadLabel>
                <Upload size={20} />
                <span>Social Security Card *</span>
              </FileUploadLabel>
              <input
                type="file"
                id="ssCard-input"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, 'ssCard')}
                style={{ display: 'none' }}
              />
              <FileUploadButton
                type="button"
                onClick={() => document.getElementById('ssCard-input').click()}
                $hasFile={!!uploadedFiles.ssCard}
              >
                {uploadedFiles.ssCard ? (
                  <>
                    <CheckCircle size={18} />
                    <span>{uploadedFiles.ssCard.name}</span>
                    <FileSize>({formatFileSize(uploadedFiles.ssCard.size)})</FileSize>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Choose File</span>
                  </>
                )}
              </FileUploadButton>
              {uploadedFiles.ssCard && (
                <RemoveButton
                  type="button"
                  onClick={() => removeFile('ssCard')}
                  as={motion.button}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </RemoveButton>
              )}
            </FileUploadGroup>

            <ImportantNote>
              <strong>Important:</strong> All Confident Care employees must pass a background check prior to seeing patients. You will receive a link to the Affidavit of Compliance with Background Screening Requirements after submitting this application.
            </ImportantNote>
          </StepContent>
        )}

        {/* Navigation Buttons */}
        <NavigationButtons>
          {currentStep > 0 && (
            <NavButton type="button" onClick={handlePrevious} $secondary>
              <ChevronLeft size={20} />
              Previous
            </NavButton>
          )}
          
          {currentStep < steps.length - 1 ? (
            <NavButton type="button" onClick={handleNext}>
              Next
              <ChevronRight size={20} />
            </NavButton>
          ) : (
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
          )}
        </NavigationButtons>
      </StyledForm>
    </ApplicationFormSection>
  );
};

// Styled Components
const ApplicationFormSection = styled.div`
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 900px;

  @media (max-width: 768px) {
    margin: 1.5rem auto;
    padding: 1.75rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    margin: 1rem 0.5rem;
    padding: 1.25rem;
    border-radius: 8px;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 600;
  }

  p {
    color: #7f8c8d;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.65rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;

    h2 {
      font-size: 1.4rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;

  &:not(:last-child) {
    margin-right: 0;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 0.75rem;
  }
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$active ? '#4a90e2' : props.$completed ? '#4caf50' : '#e0e0e0'};
  color: white;
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
  }
`;

const StepLabel = styled.span`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active ? '#4a90e2' : '#666'};
  text-align: center;
  max-width: 120px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-top: 0.65rem;
  }

  @media (max-width: 480px) {
    margin-top: 0;
    margin-left: 0;
    text-align: left;
    max-width: none;
    flex: 1;
  }
`;

const StepConnector = styled.div`
  position: absolute;
  top: 24px;
  left: calc(50% + 24px);
  width: calc(100% - 48px);
  height: 2px;
  background-color: ${props => props.$completed ? '#4caf50' : '#e0e0e0'};
  transition: background-color 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    top: 21px;
    left: calc(50% + 21px);
    width: calc(100% - 42px);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StepContent = styled.div`
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }
`;

const SubSectionTitle = styled.h4`
  font-size: 1.15rem;
  color: #34495e;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  position: relative;

  label {
    position: absolute;
    left: 10px;
    top: -12px;
    font-size: 12px;
    color: #666;
    background-color: white;
    padding: 0 5px;
    font-weight: 600;
    pointer-events: none;
    z-index: 1;
  }

  input, textarea, select {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    font-size: 16px;
    font-family: inherit;
    transition: all 0.3s ease;
    background-color: white;

    &::placeholder {
      color: transparent;
    }

    &:hover {
      border-color: #4a90e2;
    }

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.5;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 2.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;

    label {
      font-size: 11px;
    }

    input, textarea, select {
      padding: 9px;
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    label {
      font-size: 11px;
    }

    input, textarea, select {
      padding: 9px;
      font-size: 15px;
    }
  }
`;

const CheckboxGroup = styled.div`
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #2c3e50;

  input[type="checkbox"] {
    margin-top: 0.2rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    flex-shrink: 0;
  }

  span {
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
  }
`;

const FileUploadGroup = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #ddd;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #4a90e2;
    background-color: #f0f7ff;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const FileUploadLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;

  svg {
    color: #4a90e2;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const FileUploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${props => props.$hasFile ? '#e8f5e9' : 'white'};
  border: 1.5px solid ${props => props.$hasFile ? '#4caf50' : '#ddd'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: ${props => props.$hasFile ? '#2e7d32' : '#666'};
  width: 100%;
  justify-content: center;
  font-family: inherit;

  svg {
    flex-shrink: 0;
  }

  span {
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: ${props => props.$hasFile ? '#c8e6c9' : '#f5f5f5'};
    border-color: ${props => props.$hasFile ? '#4caf50' : '#4a90e2'};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.875rem;
    font-size: 0.875rem;
  }
`;

const FileSize = styled.span`
  font-size: 0.85rem;
  color: #888;
  margin-left: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background-color: #cc0000;
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 26px;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 95vh;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 2px solid #e0e0e0;
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  color: white;
  border-radius: 12px 12px 0 0;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const ModalBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const AttestationText = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.15rem;
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
    color: #555;
    font-size: 0.95rem;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #2c3e50;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    h3 {
      font-size: 1.05rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const OffenseList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: #555;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding-left: 1.25rem;

    li {
      font-size: 0.85rem;
    }
  }
`;

const AttestationForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 480px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.35rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2rem 0 1.5rem 0;

  @media (max-width: 768px) {
    margin: 1.75rem 0 1.25rem 0;
  }

  @media (max-width: 480px) {
    margin: 1.5rem 0 1rem 0;
  }
`;

const InfoBox = styled.div`
  background-color: #e3f2fd;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #1565c0;

  strong {
    color: #0d47a1;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    margin-bottom: 1.25rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.85rem;
  }
`;

const ImportantNote = styled.div`
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 1rem 1.25rem;
  margin-top: 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #856404;

  strong {
    color: #664d03;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    margin-top: 1.25rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.85rem;
  }
`;

const DocumentList = styled.ul`
  margin: 0.75rem 0 0 1.25rem;
  line-height: 1.8;

  li {
    margin-bottom: 0.25rem;
  }

  @media (max-width: 480px) {
    margin-left: 1rem;
    line-height: 1.6;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    margin-top: 1.5rem;
  }
`;

const NavButton = styled.button`
  background-color: ${props => props.$secondary ? '#6c757d' : '#4a90e2'};
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  min-width: 140px;

  &:hover {
    background-color: ${props => props.$secondary ? '#5a6268' : '#357abd'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-left: auto;

  &:hover:not(:disabled) {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
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
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
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
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  @keyframes loading3 {
    0% { transform: scale(1); }
    100% { transform: scale(0); }
  }
  @keyframes loading2 {
    0% { transform: translate(0, 0); }
    100% { transform: translate(24px, 0); }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;

  svg {
    margin-bottom: 1.5rem;
  }

  h2 {
    color: #4caf50;
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #555;
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 0.75rem;

    &:last-of-type {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
    }
  }

  strong {
    color: #4a90e2;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;

    svg {
      width: 52px;
      height: 52px;
      margin-bottom: 1.25rem;
    }

    h2 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
`;

export default ApplicationForm;