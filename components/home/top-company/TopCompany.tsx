import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { COLORS, SIZES } from "@/constants";
import TopCompanyCard from "@/components/common/cards/top-company/TopCompanyCard";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import { Endpoint, JobSearchFiltersResponseData } from "@/types/jsearch";
// import Button from "@/components/common/button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { SearchType } from "@/types/common";

import commonStyles from "@/styles/common";
import styles from "./topcompany.style";

interface TopCompanyProps {
  refreshing: boolean;
}

const TopCompany = ({ refreshing }: TopCompanyProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useFetch(Endpoint.SearchFilters, {
    query: `${user?.preferences} in ${user?.location}`,
    num_pages: 1,
  });
  const jobData = data as JobSearchFiltersResponseData;

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Top company</Text>
        {/* <Button variant="ghost" text="Show all" /> */}
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text style={commonStyles.infoText}>Something went wrong</Text>
        ) : (
          <FlatList
            data={jobData.employers}
            renderItem={({ item }) => (
              <TopCompanyCard
                employer={item}
                onPress={() =>
                  router.push(
                    `/search/type=${SearchType.Company}&name=${item.name}&id=${item.value}`
                  )
                }
              />
            )}
            keyExtractor={(item) => `company-${item.value}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default TopCompany;
