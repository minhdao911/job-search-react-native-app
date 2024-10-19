import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./button.style";
import React from "react";

interface Button {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "icon";
  text?: string;
  icon?: string;
  image?: ImageSourcePropType;
  iconSize?: number;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imgStyle?: StyleProp<ImageStyle>;
  activeOpacity?: number;
  layout?: string[];
  onPress?: () => void;
}

const Button = ({
  variant = "primary",
  text,
  icon,
  image,
  iconSize = 20,
  iconColor,
  style,
  textStyle,
  imgStyle,
  activeOpacity,
  layout = ["text", "icon"],
  onPress,
}: Button) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, styles[`${variant}Container`], style]}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      {layout.map((value, index) => (
        <React.Fragment key={index}>
          {value === "text"
            ? text && (
                <Text
                  style={[styles.btnText, styles[`${variant}Text`], textStyle]}
                >
                  {text}
                </Text>
              )
            : value === "icon"
            ? icon && (
                <Ionicons
                  name={icon as any}
                  size={iconSize}
                  color={iconColor}
                />
              )
            : image && <Image style={[styles.img, imgStyle]} source={image} />}
        </React.Fragment>
      ))}
    </TouchableOpacity>
  );
};

export default Button;
