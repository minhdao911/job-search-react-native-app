import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { JobFilterProps } from "@/types/jsearch";
import Logo from "../../logo/Logo";

import styles from "./topcompanycard.style";

interface TopCompanyCardProps {
  employer: JobFilterProps;
  onPress: () => void;
}

const TopCompanyCard = ({ employer, onPress }: TopCompanyCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Logo />
      <Text style={styles.companyName} numberOfLines={1}>
        {employer.name}
      </Text>
      <Text style={styles.jobCount}>{employer.est_count} job vacancy</Text>
    </TouchableOpacity>
  );
};

export default TopCompanyCard;
