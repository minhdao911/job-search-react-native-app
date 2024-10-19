import { Button, Input, ScreenContainer } from "@/components";
import { COLORS, FONT, icons, SIZES } from "@/constants";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const router = useRouter();

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
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button
            variant="ghost"
            text="Forgot Password"
            style={{
              alignSelf: "flex-end",
            }}
          />
          <View style={styles.btnContainer}>
            <Button text="Sign In" />
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
