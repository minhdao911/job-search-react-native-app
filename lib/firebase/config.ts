import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_PROJECT_ID,
} from "@env";
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: FIREBASE_MEASUREMENT_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  databaseURL: `https://${FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`,
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

export { app, auth, db };
