import { Button, Input, ScreenContainer } from "@/components";
import { COLORS, FONT, SIZES } from "@/constants";
import { sendResetEmail } from "@/lib/auth";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      await sendResetEmail(email);
      Alert.alert(
        "Reset password email sent",
        "Check your email and follow the instructions",
        [{ text: "Back to sign in", onPress: () => router.replace("/sign-in") }]
      );
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Password reset failed",
        "Fail to send reset password email, please try again"
      );
    }
    setIsLoading(false);
  };

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button
              variant="icon"
              icon="arrow-back"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.mainText}>Forgot password?</Text>
          <Text style={styles.subText}>
            No worries, we'll send you reset instructions
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <Button
            text="Reset password"
            isLoading={isLoading}
            onPress={handleResetPassword}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
    gap: 15,
  },
});
