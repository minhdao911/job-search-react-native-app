import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { EmploymentType } from "@/types/jsearch";
import { getEmploymentTypeText } from "@/utils";
import Button from "@/components/common/button/Button";

import styles from "./welcome.style";

const tabs = Object.values(EmploymentType).map((type) => ({
  name: getEmploymentTypeText(type),
  value: type,
}));

const Welcome = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<EmploymentType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>();

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
            value={searchTerm}
            placeholder="What are you looking for?"
            placeholderTextColor={COLORS.gray}
            onChangeText={setSearchTerm}
          />
        </View>
        <Button
          style={styles.searchBtn}
          icon="search"
          iconSize={30}
          iconColor={COLORS.white}
          onPress={() => router.push(`/search/${searchTerm}`)}
        />
      </View>
    </View>
  );
};

export default Welcome;
