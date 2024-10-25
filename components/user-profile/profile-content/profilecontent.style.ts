import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contentContainer: {
    gap: 20,
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  itemLeftText: {
    color: COLORS.secondary,
  },
  preferenceContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  formItemContainer: {
    gap: 10,
  },
  formItemTitle: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  titleInputContainer: {
    flexDirection: "row",
  },
  titleInput: {
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    backgroundColor: "transparent",
    height: 40,
    width: "auto",
  },
  titleInputBtn: {
    width: 80,
    height: 40,
  },
});

export default styles;
