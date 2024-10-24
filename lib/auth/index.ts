import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import axios from "axios";
import {
  FIREBASE_PROJECT_ID,
  FIREBASE_REGION,
  GOOGLE_SERVICES_CLIENT_ID,
} from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await signInWithEmailAndPassword(
    auth,
    email.toLowerCase(),
    password
  );
  return { ...response.user, token: await response.user.getIdToken() };
};

export const persistAuthState = async (type: "local" | "none") => {
  if (type === "local") {
    await setPersistence(auth, browserLocalPersistence);
  } else {
    await setPersistence(auth, inMemoryPersistence);
  }
};

export const verifyIdToken = async (token: string) => {
  try {
    const response = await axios.post(
      `https://${FIREBASE_REGION}-${FIREBASE_PROJECT_ID}.cloudfunctions.net/verifyIdToken`,
      {
        idToken: token,
      }
    );
    return response.data.uid;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const sendResetEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_SERVICES_CLIENT_ID,
  });
};
