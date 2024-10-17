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
  onPress?: () => void;
}

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  onPress,
}: ScreenHeaderBtnProps) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
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
