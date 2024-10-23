import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 450,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  loader: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  locationBtn: {
    width: 200,
    alignSelf: "center",
    marginTop: 15,
  },
  errorText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.red,
    marginTop: 5,
  },
});

export default styles;
