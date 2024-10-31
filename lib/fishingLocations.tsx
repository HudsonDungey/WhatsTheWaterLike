import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { FishingSpot } from '~/types/mainTypes';
import { db } from '~/lib/storageConfig'; 

export const addFishingSpot = async (name: string, latitude: number, longitude: number, activity: string, description: string,) => {
  try {
    const newFishingSpotRef = doc(db, 'fishingSpots', name); 

    await setDoc(newFishingSpotRef, {
      name: name,
      location: {
        lat: latitude,
        lng: longitude,
      },
      timestamp: new Date(), 
      activity: activity,
      description: description,
    });

  } catch (error) {
    console.error('Error adding fishing spot:', error);
  }
};

export const getFishingSpots = async (): Promise<FishingSpot[]> => {
  try {
    const fishingSpotsCollection = collection(db, 'fishingSpots');
    const querySnapshot = await getDocs(fishingSpotsCollection);

    const fishingSpots: FishingSpot[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? 'Unknown Name',
        location: data.location ?? { lat: 0, lng: 0 },
        activity: data.activity ?? 'Unknown Activity',
        description: data.description ?? 'No description available',
        timestamp: data.timestamp ?? null,
      } as FishingSpot;
    });

    return fishingSpots;
  } catch (error) {
    console.error('Error fetching fishing spots:', error);
    return []; // Return an empty array in case of error
  }
};