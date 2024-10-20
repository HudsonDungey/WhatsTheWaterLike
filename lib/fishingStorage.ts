import { app } from '~/lib/firebaseConfig'; 

export const addFishingSpot = async (spotData: { location: string; description: string; createdBy: string }) => {
  try {
    const docRef = await app.collection('fishingSpots').add({
      ...spotData,
      createdAt: new Date(),
    });
    console.log('Fishing spot added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding fishing spot:', error);
  }
};

// Get a list of all fishing spots
export const getFishingSpots = async () => {
  try {
    const snapshot = await app.collection('fishingSpots').get();
    const spots = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    console.log('Fishing spots:', spots);
  } catch (error) {
    console.error('Error fetching fishing spots:', error);
  }
};

// Get fishing spots created by a specific user
export const getFishingSpotsByUser = async (userId: string) => {
  try {
    const snapshot = await app.collection('fishingSpots').where('createdBy', '==', userId).get();
    const spots = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
    console.log('User fishing spots:', spots);
  } catch (error) {
    console.error('Error fetching user fishing spots:', error);
  }
};
