import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  logoContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
  },
  largeContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
  },
  defaultImage: {
    width: "70%",
    height: "70%",
  },
  largeImage: {
    width: "80%",
    height: "80%",
  },
});

export default styles;
