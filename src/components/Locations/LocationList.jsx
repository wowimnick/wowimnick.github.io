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
                <EmailLink href={`mailto:${location.email}`}>{location.email}</EmailLink>
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
  color: #ff5722;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
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
    gap: 0.875rem;
    padding-right: 0;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
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
  background-color: ${(props) => (props.selected ? '#ff5722' : '#fff9f0')};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    border-radius: 6px;

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const LocationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;

  h3 {
    font-size: 1.1rem;
    color: ${(props) => (props.selected ? 'white' : '#333')};
    font-weight: 600;
    line-height: 1.3;
    flex: 1;
    padding-right: 0.5rem;
  }

  svg {
    color: ${(props) => (props.selected ? 'white' : '#ff5722')};
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.05rem;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 0.65rem;

    h3 {
      font-size: 1rem;
    }
  }
`;

const LocationDetails = styled.div`
  color: ${(props) => (props.selected ? 'white' : '#666')};
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const AddressInfo = styled.p`
  margin-bottom: 0.75rem;
  line-height: 1.4;

  @media (max-width: 480px) {
    margin-bottom: 0.65rem;
    line-height: 1.35;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    margin-bottom: 0.4rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;

  svg {
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;

    svg {
      width: 13px;
      height: 13px;
    }
  }
`;

const EmailLink = styled.a`
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => (props.selected ? 'white' : '#ff5722')};
  color: ${(props) => (props.selected ? '#ff5722' : 'white')};
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
    background-color: ${(props) => (props.selected ? '#f0f0f0' : '#e64a19')};
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.875rem;
    font-size: 0.875rem;
    margin-top: 0.65rem;
    gap: 0.4rem;

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export default LocationsList;