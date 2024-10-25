import React, { useCallback, useState } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import Drawer from "expo-router/drawer";
import { RecentJobs, TopCompany, ScreenContainer, Welcome } from "@/components";
import { useAuth } from "@/providers/AuthProvider";

import styles from "@/styles/common";

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.screenContainer}>
          <Welcome />
          <TopCompany refreshing={refreshing} />
          <RecentJobs refreshing={refreshing} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default Home;
