import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  label: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default styles;
