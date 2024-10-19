import { Button, ScreenContainer } from "@/components";
import { COLORS, FONT, icons, SIZES } from "@/constants";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.imgContainer}>
        <Image
          style={styles.welcomeImg}
          source={icons.welcome}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.title}>Find a perfect</Text>
        <Text style={styles.title}>job match</Text>
        <Text style={styles.description}>
          Finding your deam job is now much easier and faster like never before
        </Text>
        <Button
          style={styles.button}
          text="Let's Get Started"
          icon="arrow-forward"
          iconColor={COLORS.lightWhite}
          onPress={() => router.push("/sign-in")}
        />
      </View>
    </ScreenContainer>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  imgContainer: {
    padding: SIZES.xLarge,
  },
  welcomeImg: {
    width: "100%",
    height: 450,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderRadius: SIZES.xLarge,
    backgroundColor: "#FFF",
    paddingVertical: 50,
    paddingHorizontal: SIZES.xLarge,
  },
  title: {
    fontSize: SIZES.xxLarge - 2,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  description: {
    fontSize: SIZES.large - 2,
    color: COLORS.primary,
    fontFamily: FONT.medium,
    marginTop: 14,
    lineHeight: SIZES.xLarge + 2,
  },
  button: {
    marginTop: 45,
  },
});
