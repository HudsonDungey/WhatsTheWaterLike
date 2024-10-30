import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './storageConfig';
import { app } from './firebaseConfig'; 

const auth = getAuth(app);
const storage = getStorage(app);

export const registerUser = async (email: string, password: string, username: string, profilePicture: File, mainActivity: string, country: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let photoURL = '';
    if (profilePicture) {
      const storageRef = ref(storage, `profile_pictures/${user.uid}`);
      await uploadBytes(storageRef, profilePicture);      
      photoURL = await getDownloadURL(storageRef);
    }
    await updateProfile(user, {
      displayName: username,
      photoURL: photoURL || '', 
    });

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: username,
      photoURL,
      mainActivity, 
      country,      
      createdAt: new Date(),
    });

    return user; 
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return { user, data }; 
    } else {
      console.error("No user document found!");
      return { user, data: null };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
