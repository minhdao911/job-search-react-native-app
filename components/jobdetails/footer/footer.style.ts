import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.large,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.medium,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.medium,
  },
  likeBtn: {
    width: 55,
    height: 55,
  },
  applyBtn: {
    flexGrow: 1,
    height: "100%",
  },
});

export default styles;
