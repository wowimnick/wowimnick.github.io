import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import LocationsHero from '../components/Locations/LocationsHero';
import LocationsList from '../components/Locations/LocationList';
import LocationMap from '../components/Locations/LocationMap';
import locations from '../components/Locations/locationData';
import { tokens } from '../styles/tokens';
import 'leaflet/dist/leaflet.css';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LocationsWrapper>
      <LocationsHero />
      <ContentContainer>
        <LocationsContent>
          <LocationsList
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
          <LocationMap
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </LocationsContent>
      </ContentContainer>
    </LocationsWrapper>
  );
};

const LocationsWrapper = styled.div`
  font-family: ${tokens.font};
`;

const ContentContainer = styled.div`
  max-width: ${tokens.maxW};
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) ${tokens.gutters};
`;

const LocationsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
  }
`;

export default withPageTransition(Locations);
