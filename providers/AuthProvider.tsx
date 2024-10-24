import { readUserData, writeUserData } from "@/lib/db";
import { User } from "@/lib/db/schema";
import React, { useContext, useEffect, useState } from "react";
import { signOut as FBSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useStorageState } from "@/hooks/useStorageState";
import { configureGoogleSignin, verifyIdToken } from "@/lib/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface Auth {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
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
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      if (token && !user) {
        const uid = await verifyIdToken(token);
        if (uid) {
          const user = await readUserData(uid);
          setUser(user);
        } else {
          setToken("");
        }
      }
    })();
  }, [token, user]);

  const signIn = async (token: string, uid: string) => {
    const user = await readUserData(uid);
    setUser(user);
    setToken(token);
  };

  const signUp = async (token: string, userData: Partial<User>) => {
    const data = {
      uid: userData.uid!,
      name: userData.name,
      email: userData.email!,
      isOnboarded: false,
    };
    await writeUserData(data);
    setUser(data);
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

  const value = {
    token,
    user,
    isLoggedIn: !!user,
    isLoading,
    setUser,
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
