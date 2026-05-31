'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MyMap = (props) => {
  const { lat, long, address } = props;

  const position = [lat || 32.3945147, long || 73.0501729]; // Default coordinates

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', minHeight: 500 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={position}
        icon={L.icon({
          iconUrl:
            'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        })}>
        <Popup>
          {address || 'Sargodha, Pakistan'} <br />
          Latitude: {position[0]} <br />
          Longitude: {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
