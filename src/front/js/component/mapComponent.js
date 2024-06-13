import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "100%", // Ajusta la altura al 100% del contenedor padre
  width: "100%", // Ajusta el ancho al 100% del contenedor padre
  borderRadius: "8px",
};

export const MapComponent = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};