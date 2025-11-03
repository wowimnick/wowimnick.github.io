import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Modal, Form, DatePicker, Radio, Button, Input, Select, message } from 'antd';
import { Drawer } from 'vaul';
import emailjs from '@emailjs/browser';

const { Option } = Select;

import { locations } from '../Locations/locationData';

// Styled Components
const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  background-color: #000;

  @media (max-width: 768px) {
    height: auto;
    min-height: 80vh;
    padding-top: 60px;
  }

  @media (max-width: 480px) {
    min-height: 70vh;
  }
`;

const HeroImageWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );

  @media (max-width: 768px) {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin-left: 10%;
  color: #ffffff;
  padding: 2rem;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;

    span {
      color: #d17474;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    margin-left: 5%;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
    padding: 2rem 1rem;
    max-width: 100%;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.75rem;

    h1 {
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
      line-height: 1.4;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
`;

const ButtonBase = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    max-width: 260px;
    padding: 0.6rem 1.15rem;
    font-size: 0.9rem;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: #a35756b8;
  color: white;
  border: none;

  &:hover {
    background-color: #8c3d3c;
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AnimatedInputWrapper = styled.div`
  position: relative;
  margin-bottom: 0rem;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    border-color: #4a90e2;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    padding: 9px;
  }
`;

const AnimatedLabel = styled.label`
  position: absolute;
  left: 10px;
  top: -12px;
  font-size: 12px;
  color: #4a90e2;
  background-color: white;
  padding: 0 5px;
  pointer-events: none;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s;

  &:hover {
    border-color: #4a90e2;
  }

  .ant-picker-input > input {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 9px;
    font-size: 15px;

    .ant-picker-input > input {
      font-size: 15px;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    padding: 10px !important;
    height: auto !important;
    border: 1px solid #d9d9d9 !important;
    border-radius: 4px !important;
    font-size: 16px !important;
  }

  &:hover .ant-select-selector {
    border-color: #4a90e2 !important;
  }

  .ant-select-selection-placeholder {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    .ant-select-selector {
      padding: 9px !important;
      font-size: 15px !important;
    }

    .ant-select-selection-placeholder {
      font-size: 15px;
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }

  .ant-modal-header {
    border-radius: 10px 10px 0 0;
  }

  .ant-modal-title {
    color: #4a90e2;
  }

  .ant-form-item-label > label {
    font-weight: 600;
  }

  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;

    &:hover {
      background-color: #357abd;
      border-color: #357abd;
    }
  }

  .ant-form-item-explain-error {
    font-size: 12px;
    margin-bottom: 13px;
    color: #ff4d4f;
  }

  @media (max-width: 768px) {
    max-width: 90% !important;
    margin: 1rem auto;
  }

  @media (max-width: 480px) {
    max-width: 95% !important;
    margin: 0.5rem auto;

    .ant-modal-content {
      padding: 1rem;
    }

    .ant-modal-header {
      padding: 1rem 1rem 0.75rem;
    }

    .ant-modal-body {
      padding: 1rem;
    }

    .ant-modal-title {
      font-size: 1.1rem;
    }

    .ant-form-item {
      margin-bottom: 1rem;
    }
  }
`;

// Vaul Drawer Styles
const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const DrawerContent = styled(Drawer.Content)`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 90vh;
  z-index: 1001;
`;

const DrawerHandle = styled.div`
  width: 48px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 2px;
  margin: 12px auto 8px;
`;

const DrawerHeader = styled.div`
  padding: 16px 20px 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const DrawerTitle = styled(Drawer.Title)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a90e2;
  margin: 0;
`;

const DrawerBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const DrawerForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 1rem;
  }

  .ant-form-item-label > label {
    font-weight: 600;
  }

  .ant-btn-primary {
    background-color: #4a90e2;
    border-color: #4a90e2;
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 600;

    &:hover {
      background-color: #357abd;
      border-color: #357abd;
    }
  }

  .ant-form-item-explain-error {
    font-size: 12px;
    margin-bottom: 13px;
    color: #ff4d4f;
  }
`;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const transition = {
  x: { type: 'tween', duration: 2, ease: 'easeInOut' },
  opacity: { duration: 2, ease: 'easeInOut' },
};

const AnimatedInput = ({ label, ...props }) => {
  return (
    <AnimatedInputWrapper>
      <StyledInput {...props} />
      <AnimatedLabel>{label}</AnimatedLabel>
    </AnimatedInputWrapper>
  );
};

const Hero = () => {
  const [form] = Form.useForm();
  const [drawerForm] = Form.useForm();
  const ref = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    {
      url: "https://guidewaycare.com/wp-content/themes/yootheme/cache/7a/how-can-nurses-improve-patient-satisfaction--7acfbb81.webp",
      alt: "Nurse holding a patient's hand"
    },
    {
      url: "https://aihcp.net/main/wp-content/uploads/2024/02/Depositphotos_622838168_S-1-1.jpg",
      alt: "Educating a family on medication"
    },
    {
      url: "https://www.northeastspineandsports.com/wp-content/uploads/2021/09/shutterstock_1639731775-scaled.jpg",
      alt: "Nurse helping a patient with walk rehabilitation"
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Block scroll when modal or drawer is open
  useEffect(() => {
    if (isModalOpen || isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isDrawerOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const openModal = () => {
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    drawerForm.resetFields();
  };

  const handleDateChange = (date, dateString) => {
    form.setFieldsValue({ dateOfBirth: dateString });
  };

  const handleDrawerDateChange = (date, dateString) => {
    drawerForm.setFieldsValue({ dateOfBirth: dateString });
  };

  const handleLocationChange = (value) => {
    form.setFieldsValue({ locationId: value });
  };

  const handleDrawerLocationChange = (value) => {
    drawerForm.setFieldsValue({ locationId: value });
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const loadingMessage = message.loading('Submitting referral...', 0);
  
    try {
      emailjs.init("mxhVfavVsSqczEg8r");
      
      const selectedLocation = locations.find(loc => loc.id === values.locationId);
      
      if (!selectedLocation) {
        throw new Error('Selected location not found');
      }

      const result = await emailjs.send(
        'service_8pz3fia',
        'template_doikkmo',
        {
          to_email: selectedLocation.email,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
          insuranceName: values.insuranceName,
          insuranceNumber: values.insuranceNumber,
          doctorOrder: values.doctorOrder,
          phoneNumber: values.phoneNumber,
          email: values.email,
          locationName: selectedLocation.name
        }
      );
  
      console.log('EmailJS result:', result);
      loadingMessage();
      message.success('Referral submitted successfully!');
      
      if (isMobile) {
        closeDrawer();
      } else {
        closeModal();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      loadingMessage();
      message.error('Failed to submit referral. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const direction = useRef(1);

  useEffect(() => {
    direction.current = direction.current * -1;
  }, [currentImageIndex]);

  const navigateToInsurances = () => {
    window.location.href = '/insurances';
  };

  const FormFields = ({ formInstance, onDateChange, onLocationChange }) => (
    <>
      <Form.Item 
        name="firstName" 
        rules={[{ required: true, message: 'Please input the first name!' }]}
      >
        <AnimatedInput label="First Name" />
      </Form.Item>
      <Form.Item 
        name="lastName" 
        rules={[{ required: true, message: 'Please input the last name!' }]}
      >
        <AnimatedInput label="Last Name" />
      </Form.Item>
      <Form.Item 
        name="dateOfBirth" 
        rules={[{ required: true, message: 'Please select the date of birth!' }]}
      >
        <AnimatedInputWrapper>
          <StyledDatePicker 
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            onChange={onDateChange}
          />
          <AnimatedLabel>Date of Birth</AnimatedLabel>
        </AnimatedInputWrapper>
      </Form.Item>
      <Form.Item 
        name="insuranceName" 
        rules={[{ required: true, message: 'Please input the insurance name!' }]}
      >
        <AnimatedInput label="Insurance Name" />
      </Form.Item>
      <Form.Item 
        name="insuranceNumber" 
        rules={[{ required: false, message: 'Please input the insurance number!' }]}
      >
        <AnimatedInput label="Insurance Number" />
      </Form.Item>
      <Form.Item 
        name="doctorOrder" 
        label="Do you have a doctor's order?" 
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Radio.Group>
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
          <Radio value="notSure">Not Sure</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[
          { required: true, message: 'Please input your phone number!' },
          { pattern: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, message: 'Please enter a valid phone number!' }
        ]}
      >
        <AnimatedInput label="Phone Number" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email address!' }
        ]}
      >
        <AnimatedInput label="Email" />
      </Form.Item>
      <Form.Item
        name="locationId"
        rules={[{ required: true, message: 'Please select a location!' }]}
      >
        <AnimatedInputWrapper>
          <StyledSelect 
            placeholder="Select a location"
            onChange={onLocationChange}
          >
            {locations.map(location => (
              <Option key={location.id} value={location.id}>{location.name}</Option>
            ))}
          </StyledSelect>
          <AnimatedLabel>Location</AnimatedLabel>
        </AnimatedInputWrapper>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
          Submit Referral
        </Button>
      </Form.Item>
    </>
  );

  return (
    <HeroWrapper ref={ref}>
      <AnimatePresence initial={false} custom={direction.current}>
        <HeroImageWrapper
          key={currentImageIndex}
          custom={direction.current}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          <motion.img
            src={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
          />
          <ImageOverlay />
        </HeroImageWrapper>
      </AnimatePresence>
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Compassionate Care
          <br />
          <span>in the Comfort <br />of Your Own Home</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Confident Care of Florida is your Medicare-certified, CHAP-accredited home health care partner. We bring skilled nursing, occupational, physical, and speech therapy directly to you.
        </motion.p>
        <ButtonGroup>
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={openModal}
          >
            Refer a Patient <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={navigateToInsurances}
          >
            Insurances
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>

      {/* Desktop Modal */}
      <StyledModal
        title="Refer a Patient"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <FormFields 
            formInstance={form}
            onDateChange={handleDateChange}
            onLocationChange={handleLocationChange}
          />
        </Form>
      </StyledModal>

      {/* Mobile Drawer */}
      <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Portal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHandle />
            <DrawerHeader>
              <DrawerTitle>Refer a Patient</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <DrawerForm form={drawerForm} layout="vertical" onFinish={onFinish}>
                <FormFields 
                  formInstance={drawerForm}
                  onDateChange={handleDrawerDateChange}
                  onLocationChange={handleDrawerLocationChange}
                />
              </DrawerForm>
            </DrawerBody>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    </HeroWrapper>
  );
};

export default Hero;