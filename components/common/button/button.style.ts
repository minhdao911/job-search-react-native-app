import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  primaryContainer: {
    height: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
  },
  ghostContainer: {
    backgroundColor: "transparent",
  },
  outlineContainer: {
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
  },
  iconContainer: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
  },
  btnText: {
    fontSize: SIZES.medium,
  },
  primaryText: {
    color: "#FFF",
    fontFamily: FONT.bold,
  },
  ghostText: {
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  outlineText: {
    fontFamily: FONT.medium,
    color: COLORS.tertiary,
  },
  iconText: {
    marginLeft: 3,
  },
});

export default styles;
