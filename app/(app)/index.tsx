import React, { useCallback, useState } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import {
  NearbyJobs,
  PopularJobs,
  ScreenContainer,
  Button,
  Welcome,
} from "@/components";

import styles from "@/styles/common";
import { useAuth } from "@/providers/AuthProvider";

const Home = () => {
  const { signOut } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Unexpected error while signing out",
        "Cannot sign out, please try again"
      );
    }
  };

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerLeft: () => <Button variant="icon" icon="menu" />,
          headerRight: () => (
            <Button variant="icon" icon="person" onPress={handleSignOut} />
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.screenContainer}>
          <Welcome />
          <PopularJobs refreshing={refreshing} />
          <NearbyJobs refreshing={refreshing} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default Home;
