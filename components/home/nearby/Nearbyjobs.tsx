import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { Endpoint, JobSearchResponseData } from "@/types/jsearch";
import { COLORS } from "@/constants";
import NearbyJobCard from "@/components/common/cards/nearby/NearbyJobCard";
import Button from "@/components/common/button/Button";

import commonStyles from "@/styles/common";
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
  const jobData = data as JobSearchResponseData[];

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <Button variant="ghost" text="Show all" />
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text style={commonStyles.infoText}>Something went wrong</Text>
        ) : (
          jobData.map((item) => (
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
