import {
  Button,
  ControlledInput,
  ScreenContainer,
  GoogleSigninButton,
} from "@/components";
import { COLORS, FONT, SIZES } from "@/constants";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/providers/AuthProvider";
import { emailRegex } from "@/utils";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type Inputs = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { signUp } = useAuth();
  const { ...methods } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const infoInputWidth = SCREEN_WIDTH / 2 - 7 - 30;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: Inputs) => {
    const { firstName, lastName, email, password } = data;
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );
      const idToken = await response.user.getIdToken();
      await signUp(idToken, {
        email,
        uid: response.user.uid,
        name: `${firstName} ${lastName}`.trim(),
      });
      setIsLoading(false);
      router.replace("/");
    } catch (err: any) {
      console.log(err);
      let errorMessage =
        "Could not create account. Please check your credentials or try again later";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please sign in instead";
      }
      Alert.alert("Authentication Failed", errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainText}>Create an account</Text>
          <Text style={styles.subText}>
            Please enter your details to sign up
          </Text>
        </View>
        <View style={styles.formContainer}>
          <FormProvider {...methods}>
            <View style={styles.infoContainer}>
              <ControlledInput
                containerStyle={{ width: infoInputWidth }}
                name="firstName"
                placeholder="First name *"
                rules={{ required: "First name is required" }}
              />
              <ControlledInput
                containerStyle={{ width: infoInputWidth }}
                name="lastName"
                placeholder="Last name"
              />
            </View>
            <ControlledInput
              name="email"
              placeholder="Email *"
              keyboardType="email-address"
              rules={{
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email",
                },
              }}
            />
            <ControlledInput
              name="password"
              placeholder="Password *"
              secureTextEntry
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
            <ControlledInput
              name="confirmPassword"
              placeholder="Confirm password *"
              secureTextEntry
              rules={{
                required: "Confirm password is required",
                validate: (value, state) => {
                  if (value !== state.password) {
                    return "Password does not match";
                  }
                  return true;
                },
              }}
            />
          </FormProvider>
          <View style={styles.btnContainer}>
            <Button
              text="Sign Up"
              isLoading={isLoading}
              onPress={methods.handleSubmit(onSubmit)}
            />
            <GoogleSigninButton label="Sign up with Google" />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.subText}>Don't have an account?</Text>
          <Button
            variant="ghost"
            text="Sign in"
            textStyle={{ color: COLORS.tertiary }}
            onPress={() => router.back()}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.xxLarge,
    paddingTop: 100,
    gap: 50,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  mainText: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontFamily: FONT.regular,
  },
  formContainer: {
    gap: 15,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnContainer: {
    marginTop: 25,
    gap: 15,
  },
  footerContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
