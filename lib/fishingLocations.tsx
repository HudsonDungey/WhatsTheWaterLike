import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
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

    console.log('Fishing spot added successfully!');
  } catch (error) {
    console.error('Error adding fishing spot:', error);
  }
};

export const getFishingSpots = async () => {
    try {
      const fishingSpotsCollection = collection(db, 'fishingSpots');
  
      const querySnapshot = await getDocs(fishingSpotsCollection);
  
      const fishingSpots = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
  
      console.log(fishingSpots); 
      return fishingSpots;
    } catch (error) {
      console.error('Error fetching fishing spots:', error);
    }
  };