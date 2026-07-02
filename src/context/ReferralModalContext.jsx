import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Drawer } from 'vaul';
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
  Divider,
} from 'antd';
import { MapPin } from 'lucide-react';
import { locations } from '../components/Locations/locationData';
import { theme } from '../styles/theme';
import { tokens } from '../styles/tokens';

const { Title, Text } = Typography;
const { Option } = Select;

const API_URL = 'https://ru2dx2s2w8.execute-api.us-east-2.amazonaws.com/default/ConfidentCare-Email';

const ReferralModalContext = createContext(null);

export const useReferralModal = () => {
  const ctx = useContext(ReferralModalContext);
  if (!ctx) throw new Error('useReferralModal must be used within ReferralModalProvider');
  return ctx;
};

const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const DrawerContent = styled(Drawer.Content)`
  background-color: ${tokens.surface};
  display: flex;
  flex-direction: column;
  border-top-left-radius: ${tokens.rMd}px;
  border-top-right-radius: ${tokens.rMd}px;
  height: 90vh;
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
  background-color: ${tokens.hairline};
  border-radius: ${tokens.rPill}px;
  margin: 16px auto;
  flex-shrink: 0;
`;

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 40px;
`;

export const ReferralModalProvider = ({ children }) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const openModal = useCallback((locationId = null) => {
    if (locationId) {
      form.setFieldsValue({ locationId });
    }
    setIsOpen(true);
  }, [form]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    form.resetFields();
  }, [form]);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const selectedLocation = locations.find((loc) => loc.id === values.locationId);
      if (!selectedLocation) {
        message.error('Please select a valid location.');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        referral: {
          ...values,
          dob: values.dateOfBirth?.format('YYYY-MM-DD'),
          locationName: selectedLocation.name,
          targetEmail: selectedLocation.email,
        },
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

  const renderFormContent = () => (
    <>
      <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        Enter the patient&apos;s details below to start the intake process.
      </Text>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ doctorOrder: 'yes' }}>
        <Title level={5} style={{ marginTop: 0, color: tokens.brand }}>Patient Details</Title>
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
                {locations.map((loc) => (
                  <Option key={loc.id} value={loc.id}>{loc.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider style={{ margin: '10px 0 20px' }} />
        <Title level={5} style={{ color: tokens.brand }}>Insurance &amp; Contact</Title>
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
    </>
  );

  return (
    <ReferralModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <ConfigProvider theme={theme}>
        {isMobile ? (
          <Drawer.Root open={isOpen} onOpenChange={setIsOpen} shouldScaleBackground>
            <Drawer.Portal>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHandle />
                <div style={{ padding: '0 20px 10px', borderBottom: `1px solid ${tokens.hairline}` }}>
                  <Title level={4} style={{ margin: 0 }}>Refer a Patient</Title>
                </div>
                <ScrollableContainer>{renderFormContent()}</ScrollableContainer>
              </DrawerContent>
            </Drawer.Portal>
          </Drawer.Root>
        ) : (
          <Modal
            title="Refer a Patient"
            open={isOpen}
            onCancel={closeModal}
            footer={null}
            width={600}
            centered
            destroyOnClose
            maskClosable={false}
          >
            {renderFormContent()}
          </Modal>
        )}
      </ConfigProvider>
    </ReferralModalContext.Provider>
  );
};
