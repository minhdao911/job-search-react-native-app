import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  infoText: {
    padding: SIZES.large,
    color: COLORS.secondary,
  },
  screenContainer: { flex: 1, padding: SIZES.large },
});

export default styles;
