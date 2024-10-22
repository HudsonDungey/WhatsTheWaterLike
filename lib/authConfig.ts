import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './firebaseConfig'; 

const auth = getAuth(app);
const storage = getStorage(app);

export const registerUser = async (email: string, password: string, username: string, profilePicture: File) => {
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

    return user; 
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
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
