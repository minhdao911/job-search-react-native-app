import { COLORS, FONT, SHADOWS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xLarge + 2,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  listContainer: {
    marginTop: 40,
    gap: 20,
    paddingBottom: 80,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.medium,
    gap: 8,
    height: 120,
    marginRight: 30,
    borderRadius: SIZES.medium,
    backgroundColor: "#FFF",
    opacity: 0.5,
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOWS.small,
  },
  checkbox: {
    alignSelf: "flex-end",
    borderRadius: 5,
    borderColor: COLORS.primary,
  },
  image: {
    width: 45,
    height: 45,
  },
  text: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
});

export default styles;
