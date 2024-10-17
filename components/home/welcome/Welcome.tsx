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
import { COLORS, SIZES } from "@/constants";
import { EmploymentType } from "@/types/jsearch";
import { getEmploymentType } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./welcome.style";

const tabs = Object.values(EmploymentType).map((type) => ({
  name: getEmploymentType(type),
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
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => router.push(`/search/${searchTerm}`)}
        >
          <Ionicons name="search" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
