import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { DatePosted, Endpoint, JobSearchResponseData } from "@/types/jsearch";
import { COLORS } from "@/constants";
import Button from "@/components/common/button/Button";
import SearchResultCard from "@/components/common/cards/search-result/SearchResultCard";
import { useAuth } from "@/providers/AuthProvider";
import { SearchType } from "@/types/common";
import { checkIfFavorite } from "@/utils";

import commonStyles from "@/styles/common";
import styles from "./recentjobs.style";

interface NearbyJobsProps {
  refreshing: boolean;
}

const NearbyJobs = ({ refreshing }: NearbyJobsProps) => {
  const router = useRouter();
  const { user, updateFavorites } = useAuth();

  const { data, isLoading, error, refetch } = useFetch(Endpoint.Search, {
    query: `${user?.preferences} in ${user?.location}`,
    date_posted: DatePosted.Week,
    page: 1,
  });
  const jobData = data as JobSearchResponseData[];

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  const handleFavPress = async (
    data: JobSearchResponseData,
    isFavorite: boolean
  ) => {
    try {
      await updateFavorites(data, isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent jobs</Text>
        <Button
          variant="ghost"
          text="Show all"
          onPress={() => router.push(`/search/type=${SearchType.Recent}`)}
        />
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text style={commonStyles.infoText}>Something went wrong</Text>
        ) : (
          jobData.map((item) => {
            const isFavorite = checkIfFavorite(user?.favorites!, item.job_id);
            return (
              <SearchResultCard
                key={`nearby-job-${item.job_id}`}
                item={item}
                isFavorite={isFavorite}
                onPress={() => router.push(`/job-details/${item.job_id}`)}
                onFavPress={handleFavPress.bind(this, item, isFavorite)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;
