import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { JobSearchResponseData } from "@/types/jsearch";
import { COLORS } from "@/constants";
import Logo from "../../logo/Logo";
import { getLocation } from "@/utils";

import styles from "./popularjobcard.style";

interface PopularJobCardProps {
  item: JobSearchResponseData;
  onPress: () => void;
}

const PopularJobCard = ({ item, onPress }: PopularJobCardProps) => {
  const [selectedJob, setSelectedJob] = useState<string>();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            selectedJob === item.job_id ? COLORS.primary : "#FFF",
        },
      ]}
      onPress={onPress}
    >
      <Logo
        src={item.employer_logo}
        style={{
          backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
        }}
      />
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={[
            styles.jobName,
            {
              color:
                selectedJob === item.job_id ? COLORS.white : COLORS.primary,
            },
          ]}
          numberOfLines={1}
        >
          {item.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text
            style={[
              styles.publisher,
              {
                color:
                  selectedJob === item.job_id ? COLORS.white : COLORS.primary,
              },
            ]}
          >
            {item.job_publisher} -
          </Text>
          <Text style={styles.location}>{getLocation(item)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
