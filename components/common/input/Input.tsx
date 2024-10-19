import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "@/constants";

import styles from "./input.style";
import {
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = (props: InputProps) => {
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

type ControlledInputProps = InputProps & UseControllerProps;

export const ControlledInput = (props: ControlledInputProps) => {
  const formContext = useFormContext();

  if (!formContext || !props.name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  const { name, rules, defaultValue, ...inputProps } = props;
  const { formState } = formContext;
  const { field } = useController({ name, rules, defaultValue });

  return (
    <View style={{ flexGrow: 1 }}>
      <Input
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
        containerStyle={[
          inputProps.containerStyle,
          formState.errors[name] && styles.error,
        ]}
      />
      {formState.errors[name] && (
        <Text style={styles.errorText}>
          {formState.errors[name].message as string}
        </Text>
      )}
    </View>
  );
};
