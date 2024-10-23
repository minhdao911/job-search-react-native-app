import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: SIZES.xxLarge,
    paddingVertical: SIZES.large,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFF",
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  backBtn: {
    backgroundColor: COLORS.gray3,
    borderRadius: SIZES.medium,
  },
  backText: {
    color: COLORS.primary,
  },
  nextBtn: {
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
  },
  disabledBtn: {
    opacity: 0.7,
  },
});

export default styles;
