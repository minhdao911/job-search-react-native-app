import { icons } from "@/constants";
import Button from "./Button";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { readData } from "@/lib/db";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { auth } from "@/lib/firebase/config";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { configureGoogleSignin } from "@/lib/auth";
import { Table } from "@/lib/db/schema";

interface GoogleSigninButtonProps {
  label: string;
}

const GoogleSigninButton = ({ label }: GoogleSigninButtonProps) => {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const { user } = await signInWithCredential(auth, googleCredential);
        const token = await user.getIdToken();
        const record = await readData(Table.Users, user.uid);

        if (record) {
          await signIn(token, user.uid);
        } else {
          await signUp(token, {
            uid: user.uid,
            name: user.displayName,
            email: user.email!,
          });
        }

        setIsLoading(false);
        router.replace("/");
      } else {
        throw Error(JSON.stringify(response));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      let errorMessage = "Could not create account, please try again";
      Alert.alert("Authentication Failed", errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      text={label}
      image={icons.google}
      layout={["image", "text"]}
      isLoading={isLoading}
      onPress={handleSignIn}
    />
  );
};

export default GoogleSigninButton;
