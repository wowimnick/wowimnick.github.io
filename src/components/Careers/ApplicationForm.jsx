import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Steps, 
  Upload, 
  Modal, 
  message, 
  DatePicker, 
  Radio, 
  Checkbox, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Divider,
  ConfigProvider
} from 'antd';
import { 
  UserOutlined, 
  SolutionOutlined, 
  FileDoneOutlined, 
  InboxOutlined, 
  CheckCircleFilled 
} from '@ant-design/icons';
import { Send, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer } from 'vaul';

import imageCompression from 'browser-image-compression';
import dayjs from 'dayjs';
import { theme } from '../../styles/theme';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

const API_URL = "https://ru2dx2s2w8.execute-api.us-east-2.amazonaws.com/default/ConfidentCare-Email";
const MAX_TOTAL_SIZE_BYTES = 3.5 * 1024 * 1024; // 3.5MB

// --- STYLED COMPONENTS FOR DRAWER ---

const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const DrawerContent = styled(Drawer.Content)`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  outline: none;
`;

const DrawerHandle = styled.div`
  width: 40px;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  margin: 16px auto;
  flex-shrink: 0;
`;

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const ApplicationForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAttestationModal, setShowAttestationModal] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  
  // Ref for scrolling to top of form
  const formTopRef = useRef(null);

  // File State
  const [totalSize, setTotalSize] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({
    resume: null,
    license: null,
    cpr: null,
    ssCard: null
  });

  // Watchers for conditional rendering
  const workedBefore = Form.useWatch('workedBefore', form);
  const hasContacts = Form.useWatch('hasContacts', form);

  // --- SCROLL LOCKING FOR MODAL ---
  useEffect(() => {
    if (showAttestationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAttestationModal]);

  // --- HELPER FUNCTIONS ---

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleFileProcess = async (file, fileType) => {
    try {
      let fileToProcess = file;

      // Image Compression
      if (file.type.startsWith('image/')) {
        const options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        try {
          fileToProcess = await imageCompression(file, options);
        } catch (error) {
          console.error("Compression failed, using original", error);
        }
      }

      const currentFileSizeBytes = uploadedFiles[fileType] ? uploadedFiles[fileType].size : 0;
      const newTotalSize = totalSize - currentFileSizeBytes + fileToProcess.size;

      if (newTotalSize > MAX_TOTAL_SIZE_BYTES) {
        message.error("Total upload size limit exceeded (3.5MB). Please compress your files.");
        return Upload.LIST_IGNORE;
      }

      const base64Data = await toBase64(fileToProcess);

      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: {
          name: fileToProcess.name,
          data: base64Data,
          size: fileToProcess.size,
          uid: file.uid // AntD needs UID
        }
      }));
      setTotalSize(newTotalSize);
      message.success(`${fileType.toUpperCase()} attached successfully.`);

    } catch (error) {
      console.error(error);
      message.error("Error processing file.");
    }
    return false; // Prevent default auto-upload
  };

  const handleRemoveFile = (fileType) => {
    if (uploadedFiles[fileType]) {
      setTotalSize(prev => prev - uploadedFiles[fileType].size);
      setUploadedFiles(prev => ({ ...prev, [fileType]: null }));
    }
  };

  // --- NAVIGATION ---

  const steps = [
    { title: 'Personal', icon: <UserOutlined /> },
    { title: 'Position', icon: <SolutionOutlined /> },
    { title: 'History & Docs', icon: <FileDoneOutlined /> },
  ];

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields(); // Validates only current step implicitly if we separated fields, but here we validate all filled so far
      const currentValues = form.getFieldsValue();
      setApplicationData((prev) => ({ ...prev, ...currentValues }));
      // Manual validation per step logic
      if (currentStep === 0) {
        await form.validateFields(['name', 'dob', 'email', 'phone', 'contactMethod']);
      } else if (currentStep === 1) {
        await form.validateFields(['position', 'office', 'startDate', 'employmentType', 'floridaLicense', 'yearsExperience']);
      } else if (currentStep === 2) {
        // Check files
        const missing = [];
        if (!uploadedFiles.resume) missing.push('Resume');
        if (!uploadedFiles.license) missing.push('License');
        if (!uploadedFiles.cpr) missing.push('CPR Card');
        
        if (missing.length > 0) {
          message.error(`Missing documents: ${missing.join(', ')}`);
          return;
        }
        await form.validateFields(); // Validate rest of history fields
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        scrollToFormTop();
      } else {
        // Pre-submission
        const values = form.getFieldsValue();
        setApplicationData(values);
        setShowAttestationModal(true);
      }
    } catch (error) {
      console.log('Validation Failed:', error);
      message.error("Please fill in all required fields.");
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    scrollToFormTop();
  };

  // --- API SUBMISSION ---

  const handleFinalSubmit = async (attestationData) => {
    setIsLoading(true);
    try {
      // Format dates from DayJS to String for API
      const formattedData = {
        ...applicationData,
        dob: applicationData.dob?.format('YYYY-MM-DD'),
        startDate: applicationData.startDate?.format('YYYY-MM-DD'),
      };

      const completePayload = {
        application: {
          ...formattedData,
          files: uploadedFiles,
          job_title: applicationData.position 
        },
        attestation: attestationData
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completePayload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setShowAttestationModal(false);
      setIsSubmitted(true);
      message.success("Application submitted successfully!");
    } catch (error) {
      console.error('Error:', error);
      message.error('Submission failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERERS ---

  if (isSubmitted) {
    return (
      <Container>
         <Card bordered={false} className="success-card">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a', marginBottom: '1.5rem' }} />
              <Title level={2}>Application Sent</Title>
              <Paragraph style={{ fontSize: '1.1rem', color: '#666' }}>
                We have received your details for the <strong>{applicationData?.position}</strong> position.
              </Paragraph>
              <Text type="secondary">Our team will review your documents and contact you shortly.</Text>
            </div>
          </motion.div>
         </Card>
      </Container>
    );
  }

  return (
    <ConfigProvider 
      theme={theme}
    >
    <Container ref={formTopRef}>
      <Card bordered={false} className="form-card">
        <Steps 
          current={currentStep} 
          items={steps} 
          className="custom-steps" 
          responsive={true}
          size='small'
        />

        <Form
          form={form}
          layout="vertical"
          size="middle"
          preserve={true}
          initialValues={{
            contactMethod: 'phone',
            floridaLicense: 'yes',
            workedBefore: 'no',
            hasContacts: 'no',
            agreeToTerms: false
          }}
        >
          <div className="step-content">
            <AnimatePresence mode="wait">
              
              {/* --- STEP 1: PERSONAL --- */}
              {currentStep === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Title level={4} className="section-title">Personal Information</Title>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Required' }]}>
                        <Input placeholder="John Doe" prefix={<UserOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Required' }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="Select date" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                        <Input placeholder="john@example.com" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Required' }]}>
                        <Input type="tel" placeholder="(555) 123-4567" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="contactMethod" label="Preferred Contact Method">
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="phone">Phone</Radio.Button>
                      <Radio.Button value="email">Email</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </motion.div>
              )}

              {/* --- STEP 2: POSITION --- */}
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Title level={4} className="section-title">Position Details</Title>
                  <Row gutter={16}>
                    <Col xs={24}>
                      <Form.Item name="position" label="Position Applying For" rules={[{ required: true, message: 'Please select a position' }]}>
                        <Select placeholder="Select Position...">
                          <Option value="RN">Registered Nurse (RN)</Option>
                          <Option value="LPN">Licensed Practical Nurse (LPN)</Option>
                          <Option value="PT">Physical Therapist (PT)</Option>
                          <Option value="PTA">Physical Therapist Assistant (PTA)</Option>
                          <Option value="OT">Occupational Therapist (OT)</Option>
                          <Option value="OTA">Occupational Therapist Assistant (OTA)</Option>
                          <Option value="ST">Speech Therapist (ST)</Option>
                          <Option value="HHA">Home Health Aide (HHA)</Option>
                          <Option value="MSW">Social Worker (MSW)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="office" label="Preferred Office" rules={[{ required: true }]}>
                        <Select placeholder="Select Location">
                          <Option value="Jacksonville">Jacksonville</Option>
                          <Option value="Palm Coast">Palm Coast</Option>
                          <Option value="South Florida">South Florida</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} placeholder="Select date" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="employmentType" label="Employment Type" rules={[{ required: true }]}>
                        <Select placeholder="Select type">
                          <Option value="Full-time">Full-time</Option>
                          <Option value="Part-time">Part-time</Option>
                          <Option value="PRN">PRN (As Needed)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="yearsExperience" label="Years Experience" rules={[{ required: true }]}>
                        <Input type="number" step="0.5" placeholder="e.g. 5" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="floridaLicense" label="Licensed in Florida?">
                    <Radio.Group>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item name="whyGoodFit" label="Why are you a good fit? (Optional)">
                    <TextArea rows={3} placeholder="Briefly describe your experience..." />
                  </Form.Item>
                </motion.div>
              )}

              {/* --- STEP 3: HISTORY & DOCS --- */}
              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Title level={4} className="section-title">Work History</Title>
                  
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="workedBefore" label="Worked with us before?">
                        <Select placeholder="Select option">
                          <Option value="no">No</Option>
                          <Option value="yes">Yes</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {workedBefore === 'yes' && (
                      <Col xs={24} md={12}>
                        <Form.Item name="previousDates" label="When and for how long?" rules={[{ required: true }]}>
                          <Input placeholder="e.g. Jan 2020 - Dec 2021" />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="hasContacts" label="Contacts within Confident Care?">
                        <Select placeholder="Select option">
                          <Option value="no">No</Option>
                          <Option value="yes">Yes</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {hasContacts === 'yes' && (
                      <Col xs={24} md={12}>
                        <Form.Item name="contactDetails" label="Contact Name & Relationship" rules={[{ required: true }]}>
                          <Input placeholder="e.g. Jane Smith, Sister" />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="previousEmployer" label="Previous Employer" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Health Corp" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="previousPhone" label="Employer Phone" rules={[{ required: true }]}>
                        <Input placeholder="e.g. (555) 555-0199" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name="previousPosition" label="Position Held & Dates" rules={[{ required: true }]}>
                    <Input placeholder="e.g. RN, 2020-2023" />
                  </Form.Item>

                  <Divider />
                  
                  <Title level={4} className="section-title">Reference</Title>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="referenceName" label="Reference Name" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Dr. Smith" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="referencePhone" label="Reference Phone" rules={[{ required: true }]}>
                        <Input placeholder="e.g. (555) 555-0123" />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="referenceEmail" label="Reference Email (Optional)" rules={[{ type: 'email' }]}>
                        <Input placeholder="ref@example.com" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider />

                  <Title level={4} className="section-title">Documents (PDF/Image)</Title>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <CustomUpload 
                        label="Resume" 
                        fileKey="resume" 
                        currentFile={uploadedFiles.resume} 
                        onUpload={handleFileProcess} 
                        onRemove={handleRemoveFile}
                        required
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <CustomUpload 
                        label="License" 
                        fileKey="license" 
                        currentFile={uploadedFiles.license} 
                        onUpload={handleFileProcess} 
                        onRemove={handleRemoveFile}
                        required
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <CustomUpload 
                        label="CPR Card" 
                        fileKey="cpr" 
                        currentFile={uploadedFiles.cpr} 
                        onUpload={handleFileProcess} 
                        onRemove={handleRemoveFile}
                        required
                      />
                    </Col>
                    <Col xs={24} md={12}>
                      <CustomUpload 
                        label="SS Card" 
                        fileKey="ssCard" 
                        currentFile={uploadedFiles.ssCard} 
                        onUpload={handleFileProcess} 
                        onRemove={handleRemoveFile}
                      />
                    </Col>
                  </Row>

                  <Form.Item name="coverLetter" label="Cover Letter" style={{ marginTop: '1.5rem' }}>
                    <TextArea rows={4} placeholder="Any additional information..." />
                  </Form.Item>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Divider />

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem' }}>
            {currentStep > 0 && (
              <Button size="middle" onClick={handlePrev} icon={<ChevronLeft size={16} />}>
                Back
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button type="primary" size="middle" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                Next Step <ChevronRight size={16} />
              </Button>
            ) : (
              <Button type="primary" size="middle" onClick={handleNext} style={{ marginLeft: 'auto'}}>
                Review & Submit <Send size={16} />
              </Button>
            )}
          </div>

        </Form>
      </Card>

      <AttestationModal 
        visible={showAttestationModal} 
        onClose={() => setShowAttestationModal(false)}
        onSubmit={handleFinalSubmit}
        initialData={applicationData}
        isLoading={isLoading}
      />

    </Container>
    </ConfigProvider>
  );
};

// --- SUB-COMPONENTS ---

const CustomUpload = ({ label, fileKey, currentFile, onUpload, onRemove, required }) => (
  <Form.Item 
    label={<span>{label} {required && <span style={{color: '#ff4d4f'}}>*</span>}</span>} 
    style={{ marginBottom: '1.5rem' }}
  >
    <Dragger
      name={fileKey}
      multiple={false}
      showUploadList={false}
      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      beforeUpload={(file) => onUpload(file, fileKey)}
      style={{ 
        background: currentFile ? '#f6ffed' : '#fafafa', 
        borderColor: currentFile ? '#b7eb8f' : '#d9d9d9',
        padding: '10px'
      }}
    >
      {currentFile ? (
        <div style={{ padding: '10px 0' }}>
          <FileText size={32} color="#52c41a" style={{ display: 'block', margin: '0 auto 10px' }} />
          <Text strong>{currentFile.name}</Text>
          <div style={{ marginTop: 8 }}>
            <Button size="small" danger onClick={(e) => { e.stopPropagation(); onRemove(fileKey); }}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '10px 0' }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#000000' }} />
          </p>
          <p className="ant-upload-text" style={{ fontSize: '14px' }}>Click or drag {label}</p>
        </div>
      )}
    </Dragger>
  </Form.Item>
);

const AttestationModal = ({ visible, onClose, onSubmit, initialData, isLoading }) => {
  const [attForm] = Form.useForm();
  const [priorScreening, setPriorScreening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && initialData) {
      attForm.setFieldsValue({
        employeeName: initialData.name,
        title: initialData.position,
        date: dayjs().format('YYYY-MM-DD'),
        signature: ''
      });
    }
  }, [visible, initialData, attForm]);

  const handleOk = async () => {
    try {
      const values = await attForm.validateFields();
      onSubmit(values);
    } catch (e) {
      // validation failed
    }
  };

  const renderAttestationForm = () => (
    <>
      <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
        <Text style={{ fontSize: '13px' }}>
          <strong>Under penalty of perjury</strong>, I attest that I have not been arrested for or convicted of any disqualifying offenses under Florida Statutes 435.04, 408.809, and 741.28.
        </Text>
      </div>

      <Form form={attForm} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Employee Name" name="employeeName">
              <Input disabled style={{ color: '#333' }} placeholder="Employee Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Position/Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="e.g. Registered Nurse" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label="Electronic Signature (Type Full Legal Name)" 
          name="signature" 
          rules={[{ required: true, message: 'Signature is required' }]}
        >
          <Input className="signature-font" placeholder="Type name here..." />
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input disabled placeholder="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="priorScreening" valuePropName="checked">
          <Checkbox onChange={(e) => setPriorScreening(e.target.checked)}>
            I have completed Level 2 screening in the last 5 years
          </Checkbox>
        </Form.Item>

        {priorScreening && (
          <Form.Item 
            name="priorScreeningPurpose" 
            label="Purpose of Prior Screening"
            rules={[{ required: true, message: 'Please specify purpose' }]}
          >
            <Input placeholder="e.g. Previous Healthcare Employment" />
          </Form.Item>
        )}

        <Divider style={{ margin: '12px 0' }} />

        <Form.Item 
          name="agreeToTerms" 
          valuePropName="checked" 
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }
          ]}
        >
          <Checkbox>I certify that the above information is true and accurate under penalty of perjury.</Checkbox>
        </Form.Item>
        
        {isMobile && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
             <Button onClick={onClose} disabled={isLoading} block>Cancel</Button>
             <Button type="primary" loading={isLoading} onClick={handleOk} block>
              Sign & Submit
            </Button>
          </div>
        )}
      </Form>
    </>
  );

  if (isMobile) {
    return (
      <Drawer.Root open={visible} onOpenChange={(open) => !open && onClose()} shouldScaleBackground>
        <Drawer.Portal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHandle />
            <div style={{ padding: '0 20px 10px 20px', borderBottom: '1px solid #f0f0f0' }}>
               <Title level={4} style={{ margin: 0 }}>Background Screening</Title>
            </div>
            <ScrollableContainer>
              {renderAttestationForm()}
            </ScrollableContainer>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Modal
      open={visible}
      title="Background Screening Attestation"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} disabled={isLoading}>Cancel</Button>,
        <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
          Sign & Submit
        </Button>
      ]}
      style={{ top: 20 }}
      width={600}
    >
      {renderAttestationForm()}
    </Modal>
  );
};

// --- STYLED WRAPPER ---
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  .form-card {
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-radius: 12px;
  }

  .section-title {
    margin-bottom: 1.5rem !important;
    color: #000000 !important;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
  }

  .custom-steps {
    margin-bottom: 2.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 576px) {
    padding: 0.5rem;
    
    .form-card {
      border-radius: 0;
    }
    
    .custom-steps {
      display: none; 
    }

    /* Prevent iOS zoom by enforcing 16px font on inputs */
    input, textarea, .ant-picker-input > input, .ant-select-selection-search-input {
      font-size: 16px !important;
    }
  }
`;

export default ApplicationForm;