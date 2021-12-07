
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVsVAzQTICLTD1p9E3NkB65kJy-tjakJo",
  authDomain: "truefriend-b486b.firebaseapp.com",
  projectId: "truefriend-b486b",
  storageBucket: "truefriend-b486b.appspot.com",
  messagingSenderId: "390619072324",
  appId: "1:390619072324:web:6a87bd3503c27ff4837911"
};


const firebase = initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth(firebase);
export default db;