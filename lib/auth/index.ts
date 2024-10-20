import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase/config";
import axios from "axios";
import { FIREBASE_PROJECT_ID, FIREBASE_REGION } from "@env";

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
