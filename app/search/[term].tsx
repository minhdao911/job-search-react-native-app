import {
  ScreenContainer,
  ScreenHeaderBtn,
  SearchResultCard,
} from "@/components";
import { COLORS, icons, SIZES } from "@/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useState } from "react";

import commonStyles from "@/styles/common";
import styles from "@/styles/search";
import useFetch from "@/hooks/useFetch";
import { Endpoint, JobSearchResponseData } from "@/types/jsearch";

const Search = () => {
  const { term } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error } = useFetch(Endpoint.Search, {
    query: term as string,
    num_pages: 1,
  });
  const jobData = data as JobSearchResponseData[];

  const [refreshing, setRefreshing] = useState(false);

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
        <View style={styles.loaderContainer}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : error ? (
            <Text style={commonStyles.infoText}>Something went wrong</Text>
          ) : (
            <></>
          )}
        </View>
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
        />
      </View>
    </ScreenContainer>
  );
};

export default Search;
