import { Button, ScreenContainer, SearchResultCard } from "@/components";
import { COLORS, SIZES } from "@/constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import {
  DatePosted,
  Endpoint,
  JobQuery,
  JobSearchQuery,
  JobSearchResponseData,
} from "@/types/jsearch";
import useSearch from "@/hooks/useSearch";
import { uniqBy } from "lodash";
import FilterSheet from "@/components/search/filter-sheet/FilterSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAuth } from "@/providers/AuthProvider";
import { SearchType } from "@/types/common";
import { checkIfFavorite } from "@/utils";

import commonStyles from "@/styles/common";
import styles from "@/styles/search";

const Search = () => {
  const router = useRouter();
  const { term } = useLocalSearchParams();
  const { user, updateFavorites } = useAuth();
  const { data, isLoading, isSuccess, error, mutate } = useSearch(
    Endpoint.Search
  );
  const sheetRef = useRef<BottomSheet>(null);

  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState<JobSearchResponseData[]>([]);
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState<string>(
    term as string
  );
  const [searchTerm, setSearchTerm] = useState<string>(term as string);

  useEffect(() => {
    const queryObj: JobQuery = {
      query: term as string,
      page,
    };
    if (term.includes("type")) {
      queryObj.query = `${user!.preferences} in ${user!.location}`;

      const params = new URLSearchParams(term as string);
      const type = params.get("type");

      if (type === SearchType.Company) {
        const name = params.get("name")!;
        const id = params.get("id")!;
        queryObj.employer = id;
        setDisplayedSearchTerm(name);
      } else if (type === SearchType.Recent) {
        queryObj.date_posted = DatePosted.Week;
        setDisplayedSearchTerm("Recent jobs");
      }
    }
    mutate(queryObj);
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
    if (jobData.length > 7) {
      mutate({ query: searchTerm, page: page + 1 });
      setPage(page + 1);
    }
  };

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
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button
              variant="icon"
              icon="arrow-back"
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <View style={commonStyles.screenContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.searchTitle}>{displayedSearchTerm}</Text>
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
            renderItem={({ item }) => {
              const isFavorite = checkIfFavorite(user?.favorites!, item.job_id);
              return (
                <SearchResultCard
                  item={item}
                  onPress={() => router.push(`/job-details/${item.job_id}`)}
                  onFavPress={handleFavPress.bind(this, item, isFavorite)}
                />
              );
            }}
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
      <FilterSheet
        ref={sheetRef}
        location={user!.location}
        onSubmit={handleApplyFilter}
      />
    </ScreenContainer>
  );
};

export default Search;
