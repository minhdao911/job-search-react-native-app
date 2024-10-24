import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { COLORS, icons } from "@/constants";
import Checkbox from "expo-checkbox";
import { JobCategory } from "@/types/common";

import styles from "./preferences.style";
import { useEffect } from "react";

const categories = [
  {
    text: JobCategory.IT,
    icon: icons.technology,
  },
  {
    text: JobCategory.Business,
    icon: icons.business,
  },
  {
    text: JobCategory.Healthcare,
    icon: icons.healthcare,
  },
  {
    text: JobCategory.Arts,
    icon: icons.design,
  },
  {
    text: JobCategory.Hospitality,
    icon: icons.hospitality,
  },
  {
    text: JobCategory.Education,
    icon: icons.education,
  },
  {
    text: JobCategory.SalesAndMarketing,
    icon: icons.marketing,
  },
  {
    text: JobCategory.Others,
    icon: icons.others,
  },
];

interface PreferencesProps {
  currentIndex: number;
  items: JobCategory[];
  setItems: (items: JobCategory[]) => void;
  setNextDisabled: (value: boolean) => void;
}

const Preferences = ({
  currentIndex,
  items,
  setItems,
  setNextDisabled,
}: PreferencesProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  useEffect(() => {
    if (currentIndex === 0) {
      if (items.length > 0) setNextDisabled(false);
      else setNextDisabled(true);
    }
  }, [items, currentIndex]);

  const handleItemPress = (item: JobCategory) => {
    const newItems = items.slice();
    const index = items.indexOf(item);
    if (index > -1) {
      newItems.splice(index, 1);
    } else {
      newItems.push(item);
    }
    setItems(newItems);
  };

  return (
    <>
      <Text style={styles.title}>What kind of jobs are you looking for?</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => {
          const selected = items.includes(item.text);
          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  width: SCREEN_WIDTH / 2 - 30 - 15,
                },
                selected && {
                  opacity: 1,
                },
              ]}
              onPress={handleItemPress.bind(this, item.text)}
            >
              <Checkbox
                style={styles.checkbox}
                value={selected}
                color={selected ? COLORS.tertiary : undefined}
              />
              <Image style={styles.image} source={item.icon} />
              <Text style={styles.text}>{item.text}</Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
      />
    </>
  );
};

export default Preferences;
