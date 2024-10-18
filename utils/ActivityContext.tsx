'use client'
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the activity context
interface ActivityContextType {
  selectedActivity: string | null;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with default values
const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// Hook to use the ActivityContext
export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};

// ActivityProvider component that wraps the app
export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  return (
    <ActivityContext.Provider value={{ selectedActivity, setSelectedActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
