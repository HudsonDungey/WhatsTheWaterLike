export type FishingSpot = {
    id: string;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    activity?: string;
    description?: string; 
    timestamp?: string
};
  
export interface AccountDetails {
    uid: string;
    email: string | null;
    displayName: string | null;
    memberShipTier?: string;
    photoURL?: string | null;
    country?: string | null; 
    mainActivity?: string | null; 
}

export type AustralianState = '' | 'NT' | 'SA' | 'NSW' | 'VIC' | 'QLD' | 'WA' | 'TAS' | 'ACT';

export type speciesType = {
  name: string;
  eatingRating: number;
  fightingRating: number;
  imageUrl: string;
  habitats: string[];
};

export type AirportType = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};
