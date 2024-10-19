import { child, get, ref, set, update } from "firebase/database";
import { db } from "../firebase/config";
import { User } from "./schema";

export const writeUserData = async (data: User) => {
  await set(ref(db, "users/" + data.uid), {
    ...data,
  });
};

export const updateUserData = async (
  uid: string,
  data: {
    preference?: string;
    location?: string;
  }
) => {
  const dbRef = ref(db);
  await update(dbRef, {
    [`/users/${uid}`]: data,
  });
};

export const readUserData = async (uid: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};
