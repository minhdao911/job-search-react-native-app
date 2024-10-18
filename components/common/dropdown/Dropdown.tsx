import { Text, View } from "react-native";
import { Dropdown as DropdownComp } from "react-native-element-dropdown";
import { COLORS } from "@/constants";

import styles from "./dropdown.style";

type Select = { name: string; value: string };

interface DropdownProps {
  data: Select[];
  placeholder?: string;
  position?: "top" | "bottom";
  selectedItem: any;
  setSelectedItem: (value: any) => void;
}

const Dropdown = ({
  data,
  placeholder,
  position,
  selectedItem,
  setSelectedItem,
}: DropdownProps) => {
  const renderItem = ({ name }: Select, selected?: boolean) => {
    return (
      <View style={styles.dropdownItem}>
        <Text
          style={[
            styles.dropdownItemText,
            selected && {
              color: COLORS.primary,
            },
          ]}
        >
          {name}
        </Text>
      </View>
    );
  };

  return (
    <DropdownComp
      style={styles.dropdownButton}
      placeholderStyle={styles.dropdownPlaceholder}
      containerStyle={styles.dropdownMenu}
      selectedTextStyle={styles.selectedItemText}
      data={data}
      labelField="name"
      valueField="value"
      placeholder={placeholder ?? "Select item"}
      dropdownPosition={position}
      value={selectedItem}
      onChange={(item) => {
        setSelectedItem(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default Dropdown;
