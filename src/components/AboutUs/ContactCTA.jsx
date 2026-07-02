import React from 'react';
import CTABand from '../shared/CTABand';
import { useReferralModal } from '../../context/ReferralModalContext';

const ContactCTA = () => {
  const { openModal } = useReferralModal();

  return (
    <CTABand
      title="Ready to experience confident care?"
      primaryLabel="Refer a Patient"
      onPrimaryClick={() => openModal()}
      secondaryLabel="Call (904) 733-1717"
      secondaryTel="(904) 733-1717"
    />
  );
};

export default ContactCTA;
