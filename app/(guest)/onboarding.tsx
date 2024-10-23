import {
  ActionButtons,
  JobTitles,
  ListItem,
  Location,
  ScreenContainer,
} from "@/components";
import Preferences from "@/components/onboarding/preferences/Preferences";
import { writeUserData } from "@/lib/db";
import { User } from "@/lib/db/schema";
import { useAuth } from "@/providers/AuthProvider";
import { JobCategory } from "@/types/common";
import { getJobTitles } from "@/utils";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ViewToken } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

type Page = {
  title: string;
  component: React.ReactNode;
};

const Onboarding = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<Animated.FlatList<Page>>();

  const [preferences, setPreferences] = useState<JobCategory[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [jobLocation, setJobLocation] = useState("");
  const [flatListIndex, setFlatListIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(true);

  const suggestedJobTitles = preferences
    .map((item) => getJobTitles(item))
    .flat();

  const pages: Page[] = [
    {
      title: "What kind of jobs are you looking for?",
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
      title: "Be more specific about your desired jobs",
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
      title: "Where do you want to work?",
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

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setFlatListIndex(viewableItems[0].index ?? 0);
    },
    []
  );

  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: Page; index: number }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );

  const handleCompleteOnboarding = async () => {
    const updatedData = {
      ...user,
      preferences: jobTitles.join(","),
      location: jobLocation,
      isOnboarded: true,
    } as User;
    await writeUserData(updatedData);
    setUser(updatedData);
    router.replace("/");
  };

  return (
    <ScreenContainer>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
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
