import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { 
  Modal, 
  Form, 
  DatePicker, 
  Radio, 
  Button, 
  Input, 
  Select, 
  message, 
  ConfigProvider,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import { locations } from '../Locations/locationData';
import { theme } from '../../styles/theme';

const { Title, Text } = Typography;
const { Option } = Select;

// Reuse the API URL from ApplicationForm
const API_URL = "https://ru2dx2s2w8.execute-api.us-east-2.amazonaws.com/default/ConfidentCare-Email";

// --- STYLED COMPONENTS (Hero Specific) ---

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
      color: #fee301;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    text-align: center;
    padding: 2rem 1rem;

    h1 { font-size: 2rem; }
    p { font-size: 1rem; }
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
    max-width: 280px;
    justify-content: center;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: #ef1c1fad;
  color: white;
  border: none;
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// --- ANIMATION VARIANTS ---
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
};

const transition = {
  x: { type: 'tween', duration: 2, ease: 'easeInOut' },
  opacity: { duration: 2, ease: 'easeInOut' },
};

const images = [
  { url: "https://guidewaycare.com/wp-content/themes/yootheme/cache/7a/how-can-nurses-improve-patient-satisfaction--7acfbb81.webp", alt: "Nurse holding hand" },
  { url: "https://aihcp.net/main/wp-content/uploads/2024/02/Depositphotos_622838168_S-1-1.jpg", alt: "Educating family" },
  { url: "https://www.northeastspineandsports.com/wp-content/uploads/2021/09/shutterstock_1639731775-scaled.jpg", alt: "Rehabilitation" },
];

// --- MAIN COMPONENT ---

const Hero = () => {
  const [form] = Form.useForm();
  const ref = useRef(null);
  const direction = useRef(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      direction.current = 1;
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Locking Logic
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const navigateToInsurances = () => {
    window.location.href = '/insurances';
  };

  // --- SUBMISSION LOGIC ---

  const onFinish = async (values) => {
    setIsSubmitting(true);
    
    try {
      // Find the email address associated with the selected location
      const selectedLocation = locations.find(loc => loc.id === values.locationId);
      const targetEmail = selectedLocation ? selectedLocation.email : null;
      const locationName = selectedLocation ? selectedLocation.name : "Unknown Location";

      if (!selectedLocation) {
        message.error("Please select a valid location.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        referral: {
          ...values,
          dob: values.dateOfBirth?.format('YYYY-MM-DD'),
          locationName,
          targetEmail // Pass this to Lambda so it knows where to route
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      message.success('Referral submitted successfully!');
      closeModal();

    } catch (error) {
      console.error('Error submitting referral:', error);
      message.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HeroWrapper ref={ref}>
      {/* Background Carousel */}
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

      {/* Hero Text Content */}
      <HeroContent>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Compassionate Care<br />
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
            onClick={openModal}
          >
            Refer a Patient <ArrowRight size={20} />
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToInsurances}
          >
            Insurances
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>

      {/* Ant Design Modal (Responsive) */}
      <ConfigProvider theme={theme}>
        <Modal
          title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>Refer a Patient</div>}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={600}
          centered
          destroyOnClose
          maskClosable={false}
          style={{ top: 20 }}
        >
          <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
            Enter the patient's details below to start the intake process.
          </Text>

          <Form 
            form={form} 
            layout="vertical" 
            onFinish={onFinish}
            initialValues={{ doctorOrder: 'yes' }}
          >
            <Title level={5} style={{ marginTop: 0, color: '#ff5722' }}>Patient Details</Title>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input placeholder="Jane" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input placeholder="Doe" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
                  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="Select Date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="locationId" label="Preferred Location" rules={[{ required: true }]}>
                  <Select placeholder="Select Office" suffixIcon={<MapPin size={14} />}>
                    {locations.map(loc => (
                      <Option key={loc.id} value={loc.id}>{loc.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider style={{ margin: '10px 0 20px' }} />
            
            <Title level={5} style={{ color: '#ff5722' }}>Insurance & Contact</Title>

            <Form.Item name="insuranceName" label="Insurance Provider" rules={[{ required: true }]}>
              <Input placeholder="e.g. Blue Cross Blue Shield" />
            </Form.Item>

            <Form.Item name="insuranceNumber" label="Insurance Policy Number">
              <Input placeholder="Policy ID (Optional)" />
            </Form.Item>

            <Form.Item name="doctorOrder" label="Do you have a doctor's order?">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="notSure">Not Sure</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                  <Input type="tel" placeholder="(555) 555-5555" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
                  <Input placeholder="jane@example.com" />
                </Form.Item>
              </Col>
            </Row>

            <div style={{ marginTop: 20 }}>
              <Button type="primary" htmlType="submit" block loading={isSubmitting} size="large">
                Send Referral
              </Button>
            </div>

          </Form>
        </Modal>
      </ConfigProvider>
    </HeroWrapper>
  );
};

export default Hero;