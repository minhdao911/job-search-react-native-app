import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Input } from "@/components/common/input/Input";
import { COLORS } from "@/constants";
import Button from "@/components/common/button/Button";

import styles from "./jobtitles.style";

interface JobTitlesProps {
  currentIndex: number;
  suggestedItems: string[];
  items: string[];
  setItems: (items: string[]) => void;
  setNextDisabled: (value: boolean) => void;
}

const JobTitles = ({
  currentIndex,
  suggestedItems,
  items,
  setItems,
  setNextDisabled,
}: JobTitlesProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const [titles, setTitles] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (suggestedItems.length > 0) setTitles(suggestedItems);
  }, [suggestedItems]);

  useEffect(() => {
    if (currentIndex === 1) {
      if (items.length > 0) setNextDisabled(false);
      else setNextDisabled(true);
    }
  }, [items, currentIndex]);

  const handleItemPress = (item: string) => {
    const newItems = items.slice();
    const index = items.indexOf(item);
    if (index > -1) {
      newItems.splice(index, 1);
    } else if (items.length < 3) {
      newItems.push(item);
    }
    setItems(newItems);
  };

  const handleAdd = () => {
    if (input) {
      setTitles([...titles, input]);
      setItems([...items, input]);
      setInput("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          containerStyle={styles.input}
          placeholder="Job title"
          value={input}
          onChangeText={setInput}
        />
        <Button style={styles.addBtn} text="Add" onPress={handleAdd} />
      </View>
      <Text style={styles.instructionText}>Select at most 3 items</Text>
      <FlatList
        data={titles}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const selected = items.includes(item);
          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  width: SCREEN_WIDTH / 2 - 30 - 8,
                },
                selected && {
                  backgroundColor: COLORS.tertiary,
                },
              ]}
              onPress={handleItemPress.bind(this, item)}
            >
              <Text
                style={[
                  styles.text,
                  selected && {
                    color: "#FFF",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default JobTitles;
