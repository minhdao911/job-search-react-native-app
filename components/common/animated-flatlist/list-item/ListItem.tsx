import { View, useWindowDimensions } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import styles from "./listitem.style";

type ListItemProps = {
  item: { component: React.ReactNode };
  index: number;
  x: SharedValue<number>;
};

const ListItem = ({ item, index, x }: ListItemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const rnViewStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  }, [index, x]);

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Animated.View style={[styles.viewContainer, rnViewStyle]}>
        {item.component}
      </Animated.View>
    </View>
  );
};

export default React.memo(ListItem);
