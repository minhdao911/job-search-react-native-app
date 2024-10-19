import { Image, StyleProp, View, ViewStyle } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";

import styles from "./logo.style";

interface LogoProps {
  src?: string | null;
  size?: "small" | "default" | "large";
  style?: StyleProp<ViewStyle>;
}

const Logo = ({ src, style, size = "default" }: LogoProps) => {
  const [logo, setLogo] = useState(src);

  return (
    <View style={[styles.logoContainer, styles[`${size}Container`], style]}>
      <Image
        style={styles[`${size}Image`]}
        source={logo ? { uri: logo } : icons.logoPlaceholder}
        onError={() => setLogo(null)}
      />
    </View>
  );
};

export default Logo;
