import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: COLORS.lightWhite,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.large,
  },
});

export default styles;
