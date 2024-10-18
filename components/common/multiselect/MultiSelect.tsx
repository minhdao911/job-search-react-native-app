import { MultiSelect as MultiSelectComp } from "react-native-element-dropdown";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./multiselect.style";

type Select = { name: string; value: string };

interface MultiSelectProps {
  data: Select[];
  placeholder?: string;
  selectedItems: any[];
  setSelectedItems: (items: any[]) => void;
}

const MultiSelect = ({
  data,
  placeholder,
  selectedItems,
  setSelectedItems,
}: MultiSelectProps) => {
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
        {selected && (
          <Ionicons
            name="checkmark-circle-outline"
            size={15}
            color={COLORS.primary}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <MultiSelectComp
        style={styles.dropdownButton}
        placeholderStyle={styles.dropdownPlaceholder}
        containerStyle={styles.dropdownMenu}
        data={data}
        labelField="name"
        valueField="value"
        placeholder={placeholder ?? "Select item"}
        value={selectedItems}
        searchPlaceholder="Search..."
        onChange={setSelectedItems}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedItems}>
              <Text style={styles.selectedItemText}>{item.name}</Text>
              <Ionicons name="close" size={15} color={COLORS.gray} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelect;
