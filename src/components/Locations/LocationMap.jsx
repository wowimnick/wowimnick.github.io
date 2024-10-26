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
      <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            <Popup>
              <PopupContent>
                <h3>{location.name}</h3>
                <p>{location.address}</p>
                <p>{location.phone}</p>
                <p>{location.email}</p>
                <DirectionsButton onClick={() => handleGetDirections(location.address)}>
                  <Navigation size={16} />
                  Get Directions
                </DirectionsButton>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};


const MapWrapper = styled.div`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 1000px) {
    flex: 1;
  }
`;

const PopupContent = styled.div`
  h3 {
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #4a90e2;
  }

  p {

    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    color: #666;
  }
`;

const DirectionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover {
    background-color: #3a7bc8;
  }
`;

export default LocationMap;