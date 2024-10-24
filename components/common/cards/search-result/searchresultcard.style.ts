import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
  },
  leftContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  textContainer: {
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.primary,
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.gray,
    marginBottom: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  jobType: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  location: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  timeText: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
});

export default styles;
