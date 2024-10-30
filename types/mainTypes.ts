export type FishingSpot = {
    id: string;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    activity?: string;
    description?: string; 
  };
  
export interface AccountDetails {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string | null;
    country?: string | null;      // New: Country
    mainActivity?: string | null; // New: Main activity
  }