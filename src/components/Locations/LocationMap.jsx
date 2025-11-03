import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const LocationMap = ({ locations, selectedLocation, onLocationSelect }) => {
  const center = [27.6648, -81.5158]; // Center of Florida
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo(
        [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng],
        12
      );
      const marker = markerRefs.current[selectedLocation.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedLocation]);

  const MapEvents = () => {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, [map]);
    return null;
  };

  const handleGetDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <MapWrapper>
      <StyledMapContainer 
        center={center} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapEvents />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.coordinates.lat, location.coordinates.lng]}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[location.id] = ref;
              }
            }}
          >
            <Popup maxWidth={280} minWidth={200}>
              <PopupContent>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <ContactRow>
                  <p>{location.phone}</p>
                </ContactRow>
                <EmailText>{location.email}</EmailText>
                <DirectionsButton onClick={() => handleGetDirections(location.address)}>
                  <Navigation size={14} />
                  Get Directions
                </DirectionsButton>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
      </StyledMapContainer>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: 600px;
  font-family: 'Poppins', sans-serif;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;

  /* Hide Leaflet attribution */
  .leaflet-control-attribution {
    display: none !important;
  }

  @media (min-width: 1000px) {
    flex: 1;
  }

  @media (max-width: 768px) {
    height: 450px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    height: 400px;
    border-radius: 6px;
  }
`;

const StyledMapContainer = styled(MapContainer)`
  /* Additional styling to ensure attribution is hidden */
  .leaflet-control-attribution {
    display: none !important;
  }

  /* Adjust popup positioning on mobile to prevent cutoff */
  @media (max-width: 480px) {
    .leaflet-popup {
      margin-bottom: 20px;
    }
    
    .leaflet-popup-content-wrapper {
      border-radius: 6px;
    }
  }
`;

const PopupContent = styled.div`
  padding: 0.25rem;
  max-width: 100%;

  h3 {
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: #4a90e2;
    line-height: 1.3;
    word-wrap: break-word;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: #666;
    line-height: 1.4;
    word-wrap: break-word;
  }

  @media (max-width: 480px) {
    padding: 0.15rem;

    h3 {
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }

    p {
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
  }
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  p {
    margin-bottom: 0;
  }
`;

const EmailText = styled.p`
  font-size: 0.8rem !important;
  word-break: break-all;
  margin-bottom: 0.4rem !important;

  @media (max-width: 480px) {
    font-size: 0.75rem !important;
  }
`;

const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.45rem 0.875rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 0.4rem;
  width: 100%;

  &:hover {
    background-color: #3a7bc8;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    margin-top: 0.35rem;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export default LocationMap;