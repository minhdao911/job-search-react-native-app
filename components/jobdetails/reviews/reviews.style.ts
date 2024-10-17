import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  headerContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  actionText: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  publisher: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  reviewCount: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: SIZES.small,
  },
  starContainer: {
    flexDirection: "row",
    alignContent: "center",
    gap: 3,
  },
  starImage: {
    width: 15,
    height: 15,
  },
  scoreText: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.secondary,
  },
});

export default styles;
