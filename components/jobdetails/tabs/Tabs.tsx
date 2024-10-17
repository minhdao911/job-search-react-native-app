import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./tabs.style";
import { COLORS } from "@/constants";
interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: any) => void;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map((name, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.btn,
            {
              backgroundColor:
                name === activeTab ? COLORS.primary : COLORS.white,
            },
          ]}
          onPress={() => setActiveTab(name)}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: name === activeTab ? "#FFF" : COLORS.gray,
              },
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
