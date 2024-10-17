import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants";

import styles from "./footer.style";

interface FooterProps {
  url: string;
}

const Footer = ({ url }: FooterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Ionicons name="heart-outline" size={25} color={COLORS.tertiary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
