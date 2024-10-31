'use client'

import React, { useState } from 'react';
import MapGL, { Marker, ViewState, MapProps as MapboxProps } from 'react-map-gl';
import { ImLocation2 } from 'react-icons/im';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface Location {
  lat: number;
  lng: number;
}

interface FishingSpot {
  id: string;
  location: Location;
}

interface MapProps {
  fishingSpots?: FishingSpot[];
  latitude: number;
  longitude: number;
  showSpots?: boolean;
  onMapClick?: (event: any) => void;
  onViewportChange?: (viewport: ViewState) => void;
}

const Map: React.FC<MapProps> = ({
  fishingSpots = [],
  latitude,
  longitude,
  showSpots = true,
  onMapClick,
  onViewportChange,
}) => {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 5,
    bearing: 0,
    pitch: 0
  });

  const handleViewportChange = (nextViewport: ViewState) => {
    setViewport(nextViewport);
    onViewportChange?.(nextViewport); 
  };

  return (
    <MapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API}
      onMove={(evt) => handleViewportChange(evt.viewState)}
      onClick={onMapClick}
      style={{ height: '100%', width: '100%' }}
    >
      {latitude && longitude && (
        <Marker
          key="user-location"
          longitude={longitude}
          latitude={latitude}
          anchor="bottom"
        >
          <ImLocation2 size={30} color="red" />
        </Marker>
      )}
      {showSpots &&
        fishingSpots.map((spot) => (
          <Marker
            key={spot.id}
            longitude={spot.location.lng}
            latitude={spot.location.lat}
            anchor="bottom"
          >
            <FaMapMarkerAlt color="red" size={32} />
          </Marker>
        ))}
    </MapGL>
  );
};

export default Map