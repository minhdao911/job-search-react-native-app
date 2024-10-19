import { Button, Input, ScreenContainer } from "@/components";
import { COLORS, FONT, icons, SIZES } from "@/constants";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  const router = useRouter();

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
          <View style={styles.infoContainer}>
            <Input placeholder="First name" containerStyle={styles.infoInput} />
            <Input placeholder="Last name" containerStyle={styles.infoInput} />
          </View>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <View style={styles.btnContainer}>
            <Button text="Sign Up" />
            <Button
              variant="secondary"
              text="Sign up with Google"
              image={icons.google}
              layout={["image", "text"]}
            />
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
  infoContainer: {
    flexDirection: "row",
    gap: 15,
  },
  infoInput: {
    flex: 1,
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
