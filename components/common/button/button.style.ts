import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  primaryContainer: {
    height: 50,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
  },
  secondaryContainer: {
    height: 50,
    backgroundColor: COLORS.gray3,
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
  secondaryText: {
    color: COLORS.primary,
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
  img: {
    width: 25,
    height: 25,
  },
});

export default styles;
