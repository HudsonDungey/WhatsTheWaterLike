'use client'
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the location context
interface Location {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

// LocationProvider component that wraps the app
export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
