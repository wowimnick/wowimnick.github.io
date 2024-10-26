import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Modal, Form, DatePicker, Radio, Button, Input, Select, message } from 'antd';
import emailjs from '@emailjs/browser';

const { Option } = Select;

// Import the locations array
import { locations } from '../Locations/locationData';

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
  const ref = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDateChange = (date, dateString) => {
    form.setFieldsValue({ dateOfBirth: dateString });
  };

  const handleLocationChange = (value) => {
    form.setFieldsValue({ locationId: value });
  };

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const loadingMessage = message.loading('Submitting referral...', 0);
  
    try {
      // Replace with your actual EmailJS public key
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
      closeModal();
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

  const navigateToLocations = () => {
    window.location.href = '/locations';
  };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Compassionate Care
          <br />
          <span>in the Comfort <br />of Your Own Home</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Confident Care of Florida is your Medicare-certified, CHAP-accredited home health care partner. We bring skilled nursing, occupational, physical, and speech therapy directly to you.
        </motion.p>
        <ButtonGroup>
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={openModal}
          >
            Refer a Patient <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={navigateToLocations}
          >
            Contact Us
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>

      <StyledModal
        title="Refer a Patient"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
                onChange={handleDateChange}
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
                onChange={handleLocationChange}
              >
                {locations.map(location => (
                  <Option key={location.id} value={location.id}>{location.name}</Option>
                ))}
              </StyledSelect>
              <AnimatedLabel>Location</AnimatedLabel>
            </AnimatedInputWrapper>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Referral
            </Button>
          </Form.Item>
        </Form>
      </StyledModal>
    </HeroWrapper>
  );
};

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
    min-height: 100vh;
    padding-top: 80px;
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

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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
    justify-content: center;
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

export default Hero;