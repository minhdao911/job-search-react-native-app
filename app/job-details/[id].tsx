import {
  Company,
  Highlights,
  JobAbout,
  JobTabs,
  Reviews,
  ScreenContainer,
  ScreenHeaderBtn,
} from "@/components";
import Footer from "@/components/jobdetails/footer/Footer";
import { COLORS, icons, SIZES } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { Endpoint, JobDetailsResponseData } from "@/types/jsearch";
import { getLocation } from "@/utils";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

enum Tab {
  Description = "Description",
  Highlights = "Highlights",
  Reviews = "Reviews",
}

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error } = useFetch(Endpoint.Details, {
    job_id: id as string,
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Description);

  const displayTabContent = () => {
    switch (activeTab) {
      case Tab.Description:
        return <JobAbout data={data[0] as JobDetailsResponseData} />;
      case Tab.Highlights:
        return (
          <Highlights
            data={(data[0] as JobDetailsResponseData).job_highlights}
          />
        );
      case Tab.Reviews:
        return (
          <Reviews
            data={(data[0] as JobDetailsResponseData).employer_reviews}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={20}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={20} />
          ),
          headerTitle: "",
        }}
      />
      <>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.noResults}>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text style={styles.noResults}>No data</Text>
        ) : (
          <View style={styles.container}>
            <Company
              name={data[0].employer_name}
              logo={data[0].employer_logo}
              jobTitle={data[0].job_title}
              location={getLocation(data[0])}
            />
            <JobTabs
              tabs={Object.values(Tab)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
            <Footer url={data[0].job_apply_link} />
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.large,
    paddingBottom: 95,
  },
  noResults: {
    padding: SIZES.large,
    color: COLORS.secondary,
  },
});
