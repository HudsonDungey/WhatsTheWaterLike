import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './storageConfig'; 
import { FishingSpot } from '~/types/mainTypes';

export const addFishingSpot = async (
  name: string,
  latitude: number,
  longitude: number,
  activity: string,
  description: string,
  imageFile: File | null 
) => {
  try {
    const newFishingSpotRef = doc(db, 'fishingSpots', name);

    let imageUrl = null;
    if (imageFile) {
      const storage = getStorage();
      const imageRef = ref(storage, `fishingSpots/${name}-${Date.now()}`); 
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }
    await setDoc(newFishingSpotRef, {
      name: name,
      location: {
        lat: latitude,
        lng: longitude,
      },
      timestamp: new Date(),
      activity: activity,
      description: description,
      imageUrl: imageUrl,
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
        imageUrl: data.imageUrl ?? null,
        timestamp: data.timestamp ?? null,
      } as FishingSpot;
    });

    return fishingSpots;
  } catch (error) {
    console.error('Error fetching fishing spots:', error);
    return []; 
  }
};
