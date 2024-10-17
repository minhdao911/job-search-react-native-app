import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { JobEmployerReview } from "@/types/jsearch";
import { icons } from "@/constants";

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
                    <Image
                      key={`full-${index}`}
                      style={styles.starImage}
                      source={icons.star}
                    />
                  ))}
                {half > 0 && (
                  <Image style={styles.starImage} source={icons.starHalf} />
                )}
                {Array(empty)
                  .fill(true)
                  .map((_, index) => (
                    <Image
                      key={`empty-${index}`}
                      style={styles.starImage}
                      source={icons.starEmpty}
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
