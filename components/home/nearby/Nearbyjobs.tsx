import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { Endpoint } from "@/types/jsearch";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";

import styles from "./nearbyjobs.style";

interface NearbyJobsProps {
  refreshing: boolean;
}

const NearbyJobs = ({ refreshing }: NearbyJobsProps) => {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch(Endpoint.Search, {
    query: "React developer",
    radius: 100,
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
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data.map((item) => (
            <NearbyJobCard
              key={`nearby-job-${item.job_id}`}
              item={item}
              onPress={() => router.push(`/job-details/${item.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
