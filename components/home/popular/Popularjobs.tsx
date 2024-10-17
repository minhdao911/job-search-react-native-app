import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { COLORS, SIZES } from "@/constants";
import PopularJobCard from "@/components/common/cards/popular/PopularJobCard";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import { Endpoint } from "@/types/jsearch";

import styles from "./popularjobs.style";

interface PopularJobsProps {
  refreshing: boolean;
}

const PopularJobs = ({ refreshing }: PopularJobsProps) => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch(Endpoint.Search, {
    query: "NodeJS developer in USA",
    num_pages: 1,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                onPress={() => router.push(`/job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={(item) => `popular-job-${item.job_id}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default PopularJobs;
