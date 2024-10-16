import React from "react";
import { View, Text } from "react-native";

import styles from "./screenheader.style";

interface ScreenHeaderBtnProps {
  iconUrl: string;
  dimension: string;
}

const ScreenHeaderBtn = ({ iconUrl, dimension }: ScreenHeaderBtnProps) => {
  return (
    <View>
      <Text>ScreenHeaderBtn</Text>
    </View>
  );
};

export default ScreenHeaderBtn;
