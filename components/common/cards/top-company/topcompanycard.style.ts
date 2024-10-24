import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
    marginTop: SIZES.small / 1.5,
  },
  jobCount: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default styles;
