import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { JobSearchResponseData } from "@/types/jsearch";
import Logo from "../../logo/Logo";
import { getEmploymentTypeText } from "@/utils";

import styles from "./nearbyjobcard.style";

interface PopularJobCardProps {
  item: JobSearchResponseData;
  onPress: () => void;
}

const NearbyJobCard = ({ item, onPress }: PopularJobCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Logo src={item.employer_logo} />
      <View style={styles.textContainer}>
        <Text style={styles.companyName}>{item.employer_name}</Text>
        <Text style={styles.jobName}>{item.job_title}</Text>
        <Text style={styles.jobType}>
          {getEmploymentTypeText(item.job_employment_type)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
