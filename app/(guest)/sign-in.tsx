import { Button, ControlledInput, ScreenContainer } from "@/components";
import { COLORS, FONT, icons, SIZES } from "@/constants";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/providers/AuthProvider";
import { emailRegex } from "@/utils";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const { ...methods } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password }: Inputs) => {
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );
      const idToken = await response.user.getIdToken();
      await signIn(idToken, response.user.uid);
      setIsLoading(false);
      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainText}>Welcome back</Text>
          <Text style={styles.subText}>
            Please enter your details to sign in
          </Text>
        </View>
        <View style={styles.formContainer}>
          <FormProvider {...methods}>
            <ControlledInput
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              keyboardType="email-address"
              secureTextEntry
              rules={{ required: "Password is required" }}
            />
          </FormProvider>
          <Button
            variant="ghost"
            text="Forgot Password"
            style={{
              alignSelf: "flex-end",
            }}
          />
          <View style={styles.btnContainer}>
            <Button
              text="Sign In"
              isLoading={isLoading}
              onPress={methods.handleSubmit(onSubmit)}
            />
            <Button
              variant="secondary"
              text="Sign in with Google"
              image={icons.google}
              layout={["image", "text"]}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.subText}>Don't have an account?</Text>
          <Button
            variant="ghost"
            text="Sign up"
            textStyle={{ color: COLORS.tertiary }}
            onPress={() => router.push("/sign-up")}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignIn;

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
  },
  mainText: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  subText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontFamily: FONT.regular,
  },
  formContainer: {
    gap: 15,
  },
  btnContainer: {
    marginTop: 15,
    gap: 15,
  },
  footerContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
