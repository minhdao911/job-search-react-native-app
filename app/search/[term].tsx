import {
  ScreenContainer,
  ScreenHeaderBtn,
  SearchResultCard,
} from "@/components";
import { COLORS, icons, SIZES } from "@/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";

import commonStyles from "@/styles/common";
import styles from "@/styles/search";
import { Endpoint, JobSearchResponseData } from "@/types/jsearch";
import useSearch from "@/hooks/useSearch";
import { uniqBy } from "lodash";

const Search = () => {
  const { term } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, isSuccess, error, mutate } = useSearch(
    Endpoint.Search
  );

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState<JobSearchResponseData[]>([]);

  useEffect(() => {
    mutate({
      query: term as string,
      page,
    });
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setJobData((prev) =>
        uniqBy([...prev, ...(data as JobSearchResponseData[])], "job_id")
      );
    }
  }, [data, isSuccess]);

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              icon="chevron-back"
              onPress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <View style={commonStyles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.searchTitle}>{term}</Text>
          <ScreenHeaderBtn
            style={styles.filterBtn}
            icon="filter"
            iconColor={COLORS.white}
          />
        </View>
        <Text style={styles.noOfSearchedJobs}>
          {jobData.length} Job Opportunities
        </Text>
        {jobData.length > 0 && (
          <FlatList
            data={jobData}
            renderItem={({ item }) => (
              <SearchResultCard
                item={item}
                onPress={() => router.push(`/job-details/${item.job_id}`)}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{
              rowGap: SIZES.medium,
            }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              mutate({ query: term as string, page: page + 1 });
              setPage(page + 1);
            }}
          />
        )}
        <View style={styles.loaderContainer}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : error && jobData.length === 0 ? (
            <Text style={commonStyles.infoText}>Something went wrong</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Search;
