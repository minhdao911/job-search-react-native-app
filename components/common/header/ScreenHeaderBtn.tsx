import React from "react";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./screenheader.style";

interface ScreenHeaderBtnProps {
  icon: string;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ScreenHeaderBtn = ({
  icon,
  iconSize = 20,
  iconColor,
  style,
  onPress,
}: ScreenHeaderBtnProps) => {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
      <Ionicons name={icon as any} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
