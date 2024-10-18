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
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    marginRight: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  input: {
    fontFamily: FONT.regular,
    height: "100%",
    paddingHorizontal: SIZES.medium,
    backgroundColor: "transparent",
  },
  submitBtn: {
    position: "absolute",
    width: "100%",
    left: SIZES.large,
    bottom: 40,
    marginTop: 20,
  },
});

export default styles;
