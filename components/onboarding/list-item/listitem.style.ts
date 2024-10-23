import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: SIZES.xxLarge,
  },
  textItem: {
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  viewContainer: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
