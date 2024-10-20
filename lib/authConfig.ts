import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

// Function to create a new account
export const registerUser = async (email: string, password: string, username: string, photoURL: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: username,
      photoURL: photoURL,
    });
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; 
  }
};

// Function to sign in an existing user
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

// Function to sign out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
