import React from "react";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import { JobEmployerReview } from "@/types/jsearch";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

import commonStyles from "@/styles/common";
import styles from "./reviews.style";

interface ReviewsProps {
  data: JobEmployerReview[];
}

const Reviews = ({ data }: ReviewsProps) => {
  return data.length > 0 ? (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const { full, half, empty } = getNumberOfStars(item.num_stars);
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.publisher}>{item.publisher}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(item.reviews_link)}
              >
                <Text style={styles.actionText}>Go to reviews</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewCount}>{item.review_count} reviews</Text>
            <View style={styles.scoreContainer}>
              <View style={styles.starContainer}>
                {Array(full)
                  .fill(true)
                  .map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={16}
                      color={COLORS.yellow}
                    />
                  ))}
                {half > 0 && (
                  <Ionicons name="star-half" size={16} color={COLORS.yellow} />
                )}
                {Array(empty)
                  .fill(true)
                  .map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star-outline"
                      size={16}
                      color={COLORS.yellow}
                    />
                  ))}
              </View>
              <Text style={styles.scoreText}>
                {item.score} / {item.max_score}
              </Text>
            </View>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <Text style={commonStyles.infoText}>No reviews</Text>
  );
};

export default Reviews;

const getNumberOfStars = (stars: number) => {
  return {
    full: Math.floor(stars),
    half: stars - Math.floor(stars),
    empty: 5 - Math.ceil(stars),
  };
};
