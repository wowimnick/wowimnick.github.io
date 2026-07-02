import React from 'react';
import StatBand from '../shared/StatBand';

const stats = [
  { value: '5', label: 'Offices' },
  { value: '10', label: 'Counties Served' },
  { value: '24/7/365', label: 'Care Availability' },
];

const ServiceOverview = () => {
  return <StatBand stats={stats} />;
};

export default ServiceOverview;
