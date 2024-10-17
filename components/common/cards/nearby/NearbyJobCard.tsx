import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { JobSearchResponseData } from "@/types/jsearch";
import Logo from "../../logo/Logo";
import { getEmploymentType } from "@/utils";

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
        <Text style={styles.jobName}>{item.job_title}</Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.companyName}>{item.employer_name},</Text>
          <Text style={styles.jobType}>
            {getEmploymentType(item.job_employment_type)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
