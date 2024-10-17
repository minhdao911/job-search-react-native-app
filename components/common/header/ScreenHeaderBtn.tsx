import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  DimensionValue,
} from "react-native";

import styles from "./screenheader.style";

interface ScreenHeaderBtnProps {
  iconUrl: ImageSourcePropType;
  dimension: DimensionValue;
}

const ScreenHeaderBtn = ({ iconUrl, dimension }: ScreenHeaderBtnProps) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Image
        style={[
          styles.btnImg,
          {
            width: dimension,
            height: dimension,
          },
        ]}
        source={iconUrl}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
