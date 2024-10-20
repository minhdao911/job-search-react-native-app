import { readUserData, writeUserData } from "@/lib/db";
import { User } from "@/lib/db/schema";
import React, { useContext, useEffect, useState } from "react";
import { signOut as FBSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useStorageState } from "@/hooks/useStorageState";
import { verifyIdToken } from "@/lib/auth";

interface Auth {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signUp: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<Auth>({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      if (token) {
        const uid = await verifyIdToken(token);
        if (uid) {
          const user = await readUserData(uid);
          setUser(user);
        } else {
          setToken("");
        }
      }
    })();
  }, [token]);

  const signIn = async (token: string) => {
    setToken(token);
  };

  const signUp = async (token: string, userData: User) => {
    await writeUserData(userData);
    setToken(token);
  };

  const signOut = async () => {
    await FBSignOut(auth);
    setToken("");
    setUser(null);
  };

  const value = {
    token,
    user,
    isLoggedIn: !!token,
    isLoading,
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
