import { COLORS, FONT, SHADOWS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  addBtn: {
    width: 65,
  },
  instructionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 250,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FFF",
    padding: SIZES.medium,
    marginRight: 16,
    marginBottom: 16,
    ...SHADOWS.small,
  },
  text: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default styles;
