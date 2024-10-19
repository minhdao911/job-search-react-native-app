import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { EmploymentType } from "@/types/jsearch";
import { getEmploymentTypeText } from "@/utils";
import Button from "@/components/common/button/Button";
import { Input } from "@/components/common/input/Input";

import styles from "./welcome.style";

const tabs = Object.values(EmploymentType).map((type) => ({
  name: getEmploymentTypeText(type),
  value: type,
}));

const Welcome = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello John Doe</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <Input
          value={searchTerm}
          placeholder="What are you looking for?"
          placeholderTextColor={COLORS.gray}
          onChangeText={setSearchTerm}
          containerStyle={{ flex: 1 }}
        />
        <Button
          style={styles.searchBtn}
          icon="search"
          iconSize={30}
          iconColor={COLORS.white}
          onPress={() => {
            if (!searchTerm) return;
            router.push(`/search/${searchTerm}`);
          }}
        />
      </View>
    </View>
  );
};

export default Welcome;
