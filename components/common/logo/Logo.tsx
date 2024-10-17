import { Image, StyleProp, View, ViewStyle } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";

import styles from "./logo.style";

interface LogoProps {
  src: string | null;
  style?: StyleProp<ViewStyle>;
}

const Logo = ({ src, style }: LogoProps) => {
  const [logo, setLogo] = useState<string | null>(src);

  return (
    <View style={[styles.logoContainer, style]}>
      <Image
        style={styles.logoImage}
        source={logo ? { uri: logo } : icons.logoPlaceholder}
        onError={() => setLogo(null)}
      />
    </View>
  );
};

export default Logo;
