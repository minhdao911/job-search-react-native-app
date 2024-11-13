import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { RecentJobs, TopCompany, ScreenContainer, Welcome } from "@/components";

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
