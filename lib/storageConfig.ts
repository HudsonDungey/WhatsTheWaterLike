import { app } from '~/lib/firebaseConfig'; 
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(app);
