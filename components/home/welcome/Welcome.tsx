import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, icons, SIZES } from "@/constants";
import { EmploymentType } from "@/types/jsearch";
import { getEmploymentType } from "@/utils";

import styles from "./welcome.style";

const tabs = Object.values(EmploymentType).map((type) => ({
  name: getEmploymentType(type),
  value: type,
}));

const Welcome = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<EmploymentType | null>(null);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello John Doe</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            placeholderTextColor={COLORS.gray}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image style={styles.searchBtnImage} source={icons.search} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  borderColor:
                    activeTab === item.value ? COLORS.secondary : COLORS.gray2,
                },
              ]}
              onPress={() => {
                setActiveTab(item.value);
                router.push(`/search/${item.value}`);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === item.value ? COLORS.secondary : COLORS.gray,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
