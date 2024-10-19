import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import {
  NearbyJobs,
  PopularJobs,
  ScreenContainer,
  Button,
  Welcome,
} from "@/components";

import styles from "@/styles/common";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <ScreenContainer>
      {/* <Stack.Screen
        options={{
          headerLeft: () => <Button variant="icon" icon="menu" />,
          headerRight: () => <Button variant="icon" icon="people" />,
        }}
      /> */}
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
