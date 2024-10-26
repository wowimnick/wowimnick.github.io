import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import LocationsHero from '../components/Locations/LocationsHero';
import LocationsList from '../components/Locations/LocationList';
import LocationMap from '../components/Locations/LocationMap';
import locations from '../components/Locations/locationData'
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <LocationsWrapper>
      <LocationsHero />
      <ContentContainer>
        <LocationsContent>
          <LocationsList
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
          <LocationMap
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
          />
        </LocationsContent>
      </ContentContainer>
    </LocationsWrapper>
  );
};

const LocationsWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 5rem auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const LocationsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export default withPageTransition(Locations);