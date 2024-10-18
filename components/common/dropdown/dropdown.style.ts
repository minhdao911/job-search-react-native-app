import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdownButton: {
    width: "100%",
    height: 40,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  dropdownPlaceholder: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  dropdownMenu: {
    borderRadius: 8,
  },
  dropdownItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemText: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  selectedItemText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default styles;
