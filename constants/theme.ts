const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",
  gray: "#83829A",
  gray2: "#C1C0C8",
  gray3: "#e4e2eb",
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  yellow: "#FFC109",
  red: "#D95639",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 8,
  small: 12,
  medium: 14,
  large: 18,
  xLarge: 22,
  xxLarge: 30,
};

const SHADOWS = {
  small: {
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
