import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./button.style";

interface Button {
  variant?: "primary" | "ghost" | "outline" | "icon";
  text?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  onPress?: () => void;
}

const Button = ({
  variant = "primary",
  text,
  icon,
  iconSize = 20,
  iconColor,
  style,
  textStyle,
  activeOpacity,
  onPress,
}: Button) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, styles[`${variant}Container`], style]}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      {icon && (
        <Ionicons name={icon as any} size={iconSize} color={iconColor} />
      )}
      {text && (
        <Text style={[styles.btnText, styles[`${variant}Text`], textStyle]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
