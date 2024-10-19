import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "@/constants";

import styles from "./input.style";

const Input = (
  props: TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
  }
) => {
  return (
    <View style={[styles.inputContainer, props.containerStyle]}>
      <TextInput
        style={styles.input}
        {...props}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};

export default Input;
