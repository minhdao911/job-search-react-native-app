import {
  ActionButtons,
  AnimatedFlatList,
  JobTitles,
  Location,
  Preferences,
  ScreenContainer,
} from "@/components";
import { Page } from "@/components/common/animated-flatlist/AnimatedFlatList";
import { writeData } from "@/lib/db";
import { Table, User } from "@/lib/db/schema";
import { useAuth } from "@/providers/AuthProvider";
import { JobCategory } from "@/types/common";
import { getJobTitles } from "@/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import Animated, { useAnimatedRef } from "react-native-reanimated";

const Onboarding = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const flatListRef = useAnimatedRef<Animated.FlatList<Page>>();

  const [preferences, setPreferences] = useState<JobCategory[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [jobLocation, setJobLocation] = useState("");
  const [flatListIndex, setFlatListIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(true);

  const suggestedJobTitles = preferences
    .map((item) => getJobTitles(item))
    .flat();

  const pages = [
    {
      component: (
        <Preferences
          currentIndex={flatListIndex}
          items={preferences}
          setItems={setPreferences}
          setNextDisabled={setNextDisabled}
        />
      ),
    },
    {
      component: (
        <JobTitles
          currentIndex={flatListIndex}
          suggestedItems={suggestedJobTitles}
          items={jobTitles}
          setItems={setJobTitles}
          setNextDisabled={setNextDisabled}
        />
      ),
    },
    {
      component: (
        <Location
          currentIndex={flatListIndex}
          input={jobLocation}
          setInput={setJobLocation}
          setNextDisabled={setNextDisabled}
        />
      ),
    },
  ];

  const handleCompleteOnboarding = async () => {
    const updatedData = {
      ...user,
      preferences: jobTitles.join(","),
      location: jobLocation,
      isOnboarded: true,
    } as User;
    await writeData(Table.Users, user!.uid, updatedData);
    setUser({ ...updatedData, favorites: [] });
    router.replace("/");
  };

  return (
    <ScreenContainer>
      <AnimatedFlatList
        ref={flatListRef}
        setCurrentIndex={setFlatListIndex}
        pages={pages}
        scrollEnabled={!nextDisabled}
      />
      <ActionButtons
        currentIndex={flatListIndex}
        length={pages.length}
        flatListRef={flatListRef}
        nextDisabled={nextDisabled}
        onSubmit={handleCompleteOnboarding}
      />
    </ScreenContainer>
  );
};

export default Onboarding;
