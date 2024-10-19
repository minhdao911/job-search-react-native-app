import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  getReactNativePersistence,
} from "firebase/auth";
import { auth } from "../firebase/config";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
    await setPersistence(
      auth,
      getReactNativePersistence(ReactNativeAsyncStorage)
    );
  } else {
    await setPersistence(auth, inMemoryPersistence);
  }
};
