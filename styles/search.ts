import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    textTransform: "capitalize",
  },
  filterBtn: {
    backgroundColor: COLORS.tertiary,
  },
  noOfSearchedJobs: {
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.primary,
    marginTop: 2,
    marginBottom: SIZES.medium,
  },
  loaderContainer: {
    marginTop: SIZES.medium,
  },
});

export default styles;
