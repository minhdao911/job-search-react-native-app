import React from "react";
import { View, Linking } from "react-native";
import { COLORS } from "@/constants";
import Button from "@/components/common/button/Button";

import styles from "./footer.style";

interface FooterProps {
  url: string;
}

const Footer = ({ url }: FooterProps) => {
  return (
    <View style={styles.container}>
      <Button
        variant="outline"
        icon="heart-outline"
        iconSize={25}
        iconColor={COLORS.tertiary}
        style={styles.likeBtn}
      />
      <Button
        text="Apply for job"
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      />
    </View>
  );
};

export default Footer;
