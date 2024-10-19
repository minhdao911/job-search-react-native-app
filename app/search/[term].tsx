import { Button, ScreenContainer, SearchResultCard } from "@/components";
import { COLORS, SIZES } from "@/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  Endpoint,
  JobSearchQuery,
  JobSearchResponseData,
} from "@/types/jsearch";
import useSearch from "@/hooks/useSearch";
import { uniqBy } from "lodash";
import FilterSheet from "@/components/search/filter-sheet/FilterSheet";
import BottomSheet from "@gorhom/bottom-sheet";

import commonStyles from "@/styles/common";
import styles from "@/styles/search";

const Search = () => {
  const { term } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, isSuccess, error, mutate } = useSearch(
    Endpoint.Search
  );
  const sheetRef = useRef<BottomSheet>(null);

  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState<JobSearchResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(term as string);

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

  const handleApplyFilter = (params: Partial<JobSearchQuery>) => {
    const query = params.query
      ? term + ` in ${params.query}`
      : (term as string);

    setJobData([]);
    setSearchTerm(query);
    mutate({
      ...params,
      query,
      page: 1,
    });
    setPage(1);
  };

  const handleFetchMore = () => {
    mutate({ query: searchTerm, page: page + 1 });
    setPage(page + 1);
  };

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <Button
              variant="icon"
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
          <Button
            variant="icon"
            style={styles.filterBtn}
            icon="filter"
            iconColor={COLORS.white}
            onPress={() => {
              sheetRef.current?.expand();
            }}
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
            onEndReached={handleFetchMore}
          />
        )}
        <View style={styles.loaderContainer}>
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : error && jobData.length === 0 ? (
            <Text style={[commonStyles.infoText, { padding: 0 }]}>
              Something went wrong
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      <FilterSheet ref={sheetRef} onSubmit={handleApplyFilter} />
    </ScreenContainer>
  );
};

export default Search;
