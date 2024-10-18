import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SIZES.medium,
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
  btn: {
    flexGrow: 1,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.medium,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  btnText: {
    textAlign: "center",
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
});

export default styles;
