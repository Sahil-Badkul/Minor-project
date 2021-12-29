
import { initializeApp } from "firebase/app";
// Database
import {getFirestore} from "firebase/firestore";
// Authentication
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Storage
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


const firebase = initializeApp(firebaseConfig);

const db = getFirestore();
export default db;
export const storage = getStorage();
export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider();