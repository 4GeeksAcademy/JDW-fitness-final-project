import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "300px",
  width: "300px",
  "borderRadius": "8px",
  "border": "2px solid orange"
};

export const MapComponent = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};