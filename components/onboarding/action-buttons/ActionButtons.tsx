import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import styles from "./actionbuttons.style";

type ActionButtonsProps = {
  currentIndex: number;
  length: number;
  flatListRef: any;
  nextDisabled?: boolean;
  onSubmit: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);

const ActionButtons = ({
  currentIndex,
  length,
  flatListRef,
  nextDisabled,
  onSubmit,
}: ActionButtonsProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const fullBtnWidth = SCREEN_WIDTH - 60;
  const halfBtnWidth = SCREEN_WIDTH / 2 - 30 - 9;

  const backBtnStyle = useAnimatedStyle(() => {
    return {
      width: currentIndex > 0 ? withTiming(halfBtnWidth) : withTiming(0),
      marginRight: currentIndex > 0 ? withTiming(20) : withTiming(0),
      height: 50,
    };
  }, [currentIndex, length]);

  const backTextStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex > 0 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: currentIndex > 0 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const nextBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        currentIndex === 0
          ? withTiming(fullBtnWidth)
          : withTiming(halfBtnWidth),
      height: 50,
    };
  }, [currentIndex, length]);

  const goToNextPage = () => {
    if (currentIndex < length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const goToPreviousPage = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ActionButton
        text="Back"
        btnStyle={[styles.backBtn, backBtnStyle]}
        textStyle={[styles.backText, backTextStyle]}
        onPress={goToPreviousPage}
      />
      <ActionButton
        text={currentIndex === length - 1 ? "Find jobs" : "Next"}
        btnStyle={[styles.nextBtn, nextBtnStyle]}
        onPress={currentIndex === length - 1 ? onSubmit : goToNextPage}
        disabled={nextDisabled}
      />
    </View>
  );
};

export default ActionButtons;

const ActionButton = ({
  text,
  btnStyle,
  textStyle,
  disabled,
  onPress,
}: {
  text: string;
  btnStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  textStyle?: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
  disabled?: boolean;
  onPress: () => void;
}) => {
  return (
    <AnimatedPressable
      style={[styles.button, disabled && styles.disabledBtn, btnStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.Text style={[styles.btnText, textStyle]}>{text}</Animated.Text>
    </AnimatedPressable>
  );
};
