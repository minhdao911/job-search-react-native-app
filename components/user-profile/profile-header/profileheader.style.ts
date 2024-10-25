import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerBlock: {
    height: 60,
    width: "100%",
    backgroundColor: COLORS.gray3,
  },
  headerTextContainer: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },
  joinText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  profileImgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImgBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 10,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.lightWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    width: 80,
    height: 80,
  },
});

export default styles;
