import { Text, View } from "react-native";
import RNCheckbox from "expo-checkbox";
import { COLORS } from "@/constants";

import styles from "./checkbox.style";

interface CheckboxProps {
  value: boolean;
  label: string;
  onValueChange: (value: boolean) => void;
}

const Checkbox = ({ value, label, onValueChange }: CheckboxProps) => {
  return (
    <View style={styles.container}>
      <RNCheckbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        color={value ? COLORS.tertiary : undefined}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Checkbox;
