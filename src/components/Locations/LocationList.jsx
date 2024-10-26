import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { MapPin, Phone, Mail, Navigation, Printer } from 'lucide-react';

const LocationsList = ({ locations, selectedLocation, onLocationSelect, isMapVisible }) => {
  const handleGetDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <ListWrapper>
      <CustomH2>Our Offices</CustomH2>
      <LocationsContainer>
        {locations.map((location) => (
          <LocationItem
            key={location.id}
            onClick={() => onLocationSelect(location)}
            selected={selectedLocation && selectedLocation.id === location.id}
          >
            <LocationHeader selected={selectedLocation && selectedLocation.id === location.id}>
              <h3>{location.name}</h3>
              <MapPin size={16} />
            </LocationHeader>
            <LocationDetails selected={selectedLocation && selectedLocation.id === location.id}>
              <AddressInfo>{location.address}</AddressInfo>
              <ContactGrid>
                <ContactInfo>
                  <Phone size={14} />
                  <span>{location.phone}</span>
                </ContactInfo>
                <ContactInfo>
                  <Printer size={14} />
                  <span>{location.fax}</span>
                </ContactInfo>
              </ContactGrid>
              <ContactInfo>
                <Mail size={14} />
                <span>{location.email}</span>
              </ContactInfo>
              {!isMapVisible && (
                <DirectionsButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(location.address);
                  }}
                  selected={selectedLocation && selectedLocation.id === location.id}
                >
                  <Navigation size={16} />
                  Get Directions
                </DirectionsButton>
              )}
            </LocationDetails>
          </LocationItem>
        ))}
      </LocationsContainer>
    </ListWrapper>
  );
};

const CustomH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a90e2;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin: 0;
  }
`;

const LocationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0rem;
  gap: 1rem;
  overflow-y: auto;
  max-height: 600px;
  padding-right: 0.5rem;

  @media (max-width: 768px) {
    max-height: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LocationItem = styled.div`
  background-color: ${(props) => (props.selected ? '#4a90e2' : '#f0f0f0')};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  h3 {
    font-size: 1.1rem;
    color: ${(props) => (props.selected ? 'white' : '#333')};
    font-weight: 600;
  }

  svg {
    color: ${(props) => (props.selected ? 'white' : '#4a90e2')};
  }
`;

const LocationDetails = styled.div`
  color: ${(props) => (props.selected ? 'white' : '#666')};
  font-size: 0.9rem;
`;

const AddressInfo = styled.p`
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.selected ? 'white' : '#4a90e2')};
  color: ${(props) => (props.selected ? '#4a90e2' : 'white')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 0.75rem;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.selected ? '#f0f0f0' : '#3a7bc8')};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default LocationsList;