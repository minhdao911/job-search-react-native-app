import React from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";

import styles from "./button.style";

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
  isLoading?: boolean;
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
  isLoading,
  onPress,
}: Button) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, styles[`${variant}Container`], style]}
      activeOpacity={activeOpacity}
      disabled={isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.lightWhite} />
      ) : (
        layout.map((value, index) => (
          <React.Fragment key={index}>
            {value === "text"
              ? text && (
                  <Text
                    style={[
                      styles.btnText,
                      styles[`${variant}Text`],
                      textStyle,
                    ]}
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
              : image && (
                  <Image style={[styles.img, imgStyle]} source={image} />
                )}
          </React.Fragment>
        ))
      )}
    </TouchableOpacity>
  );
};

export default Button;
