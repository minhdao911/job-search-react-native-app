import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.gray,
    marginBottom: 1,
  },
  jobType: {
    fontSize: SIZES.small,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 5,
  },
});

export default styles;
