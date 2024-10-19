import { readUserData, writeUserData } from "@/lib/db";
import { User } from "@/lib/db/schema";
import React, { useState } from "react";
import { signOut as FBSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

interface Auth {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
  signIn: (token: string, uid: string) => Promise<void>;
  signUp: (token: string, userData: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<Auth>({
  token: null,
  isLoggedIn: false,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (token: string, uid: string) => {
    const user = await readUserData(uid);
    setToken(token);
    setUser(user);
  };

  const signUp = async (token: string, userData: User) => {
    await writeUserData(userData);
    setToken(token);
    setUser(userData);
  };

  const signOut = async () => {
    await FBSignOut(auth);
    setToken("");
    setUser(null);
  };

  const value = {
    token,
    isLoggedIn: !!token,
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;