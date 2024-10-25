import { child, get, ref, set } from "firebase/database";
import { db } from "../firebase/config";
import { Table } from "./schema";

export const writeData = async (table: Table, uid: string, data: any) => {
  await set(ref(db, table + "/" + uid), data);
};

export const readData = async (table: Table, uid: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `${table}/${uid}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};
