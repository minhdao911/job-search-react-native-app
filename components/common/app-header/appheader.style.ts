import { COLORS, SIZES } from "@/constants";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.large,
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
});

export default styles;
