import {
  Button,
  Company,
  Highlights,
  JobAbout,
  JobTabs,
  Reviews,
  ScreenContainer,
} from "@/components";
import Footer from "@/components/jobdetails/footer/Footer";
import { COLORS } from "@/constants";
import useFetch from "@/hooks/useFetch";
import { Endpoint, JobDetailsResponseData } from "@/types/jsearch";
import { getLocationText } from "@/utils";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import commonStyles from "@/styles/common";

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
  const jobData = data as JobDetailsResponseData[];

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Description);

  const displayTabContent = (data: JobDetailsResponseData) => {
    switch (activeTab) {
      case Tab.Description:
        return <JobAbout data={data} />;
      case Tab.Highlights:
        return <Highlights data={data.job_highlights} />;
      case Tab.Reviews:
        return <Reviews data={data.employer_reviews} />;
      default:
        return null;
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
          headerRight: () => (
            <Button variant="icon" icon="share-social-outline" />
          ),
        }}
      />
      <>
        {isLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : error ? (
          <Text style={commonStyles.infoText}>Something went wrong</Text>
        ) : jobData.length === 0 ? (
          <Text style={commonStyles.infoText}>No data</Text>
        ) : (
          <View style={[commonStyles.screenContainer, { paddingBottom: 95 }]}>
            <Company
              name={jobData[0].employer_name}
              logo={jobData[0].employer_logo}
              jobTitle={jobData[0].job_title}
              location={getLocationText(jobData[0])}
            />
            <JobTabs
              tabs={Object.values(Tab)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent(jobData[0])}
            <Footer url={jobData[0].job_apply_link} />
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default JobDetails;