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
  