import { LocalUser, Table, User } from "@/lib/db/schema";
import React, { useContext, useEffect, useState } from "react";
import { signOut as FBSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useStorageState } from "@/hooks/useStorageState";
import { configureGoogleSignin, verifyIdToken } from "@/lib/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { readData, writeData } from "@/lib/db";
import { JobSearchResponseData } from "@/types/jsearch";
import { concat, remove } from "lodash";

interface Auth {
  token: string | null;
  user: LocalUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: LocalUser) => void;
  updateFavorites: (
    data: JobSearchResponseData,
    isFavorite: boolean
  ) => Promise<void>;
  signIn: (token: string, uid: string) => Promise<void>;
  signUp: (token: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<Auth>({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: false,
  setUser: () => {},
  updateFavorites: async () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [user, setUser] = useState<LocalUser | null>(null);

  useEffect(() => {
    (async () => {
      if (token && !user) {
        const uid = await verifyIdToken(token);
        if (uid) {
          const user = await readData(Table.Users, uid);
          const favs = await readData(Table.Favorites, uid);
          setUser({ ...user, favorites: favs ? JSON.parse(favs) : [] });
        } else {
          setToken("");
        }
      }
    })();
  }, [token, user]);

  const signIn = async (token: string, uid: string) => {
    const user = await readData(Table.Users, uid);
    const favs = await readData(Table.Favorites, uid);
    setUser({ ...user, favorites: favs ? JSON.parse(favs) : [] });
    setToken(token);
  };

  const signUp = async (token: string, userData: Partial<User>) => {
    const data = {
      uid: userData.uid!,
      name: userData.name,
      email: userData.email!,
      isOnboarded: false,
    };
    await writeData(Table.Users, userData.uid!, data);
    setUser({ ...data, favorites: [] });
    setToken(token);
  };

  const signOut = async () => {
    await FBSignOut(auth);

    configureGoogleSignin();
    const isGoogleSignedIn = await GoogleSignin.hasPreviousSignIn();
    if (isGoogleSignedIn) {
      // Sign out from Google session
      await GoogleSignin.signOut();
    }

    setToken("");
    setUser(null);
  };

  const updateFavorites = async (
    data: JobSearchResponseData,
    isFavorite: boolean
  ) => {
    let updatedData: JobSearchResponseData[] = [];
    if (isFavorite) {
      updatedData = remove(
        user?.favorites!,
        (item) => item.job_id === data.job_id
      );
    } else {
      updatedData = concat(user?.favorites!, data);
    }
    await writeData(Table.Favorites, user!.uid, JSON.stringify(updatedData));
    setUser({ ...user!, favorites: updatedData });
  };

  const value = {
    token,
    user,
    isLoggedIn: !!user,
    isLoading,
    setUser,
    updateFavorites,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <AuthProvider />");
  }
  return value;
};

export default AuthContext;
