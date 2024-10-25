import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.large,
  },
  contentWrapper: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 120,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sheetTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  filterItemContainer: {
    gap: 10,
  },
  filterItemTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  checkboxText: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
  },
  submitBtnContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 20,
    paddingHorizontal: SIZES.large,
    paddingBottom: 40,
    backgroundColor: COLORS.lightWhite,
  },
});

export default styles;
