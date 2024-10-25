import { ScreenContainer, SearchResultCard } from "@/components";
import { COLORS, FONT, SIZES } from "@/constants";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";

import commonStyles from "@/styles/common";
import styles from "@/styles/search";

const Favorites = () => {
  const router = useRouter();
  const { user } = useAuth();

  const favorites = user?.favorites;

  return (
    <ScreenContainer>
      <View style={commonStyles.screenContainer}>
        <Text style={styles.title}>Favorite Jobs</Text>
        <View style={styles.listContainer}>
          {favorites && favorites.length > 0 ? (
            <FlatList
              data={favorites}
              renderItem={({ item }) => {
                return (
                  <SearchResultCard
                    item={item}
                    hasFavIcon={false}
                    onPress={() => router.push(`/job-details/${item.job_id}`)}
                  />
                );
              }}
              keyExtractor={(item) => item.job_id}
              contentContainerStyle={{
                rowGap: SIZES.medium,
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={commonStyles.infoText}>
              You haven't added any jobs to favorites
            </Text>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Favorites;
