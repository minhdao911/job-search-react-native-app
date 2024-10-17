import React from "react";
import { View, Text } from "react-native";
import Logo from "../../common/logo/Logo";
import { COLORS } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./company.style";

interface CompanyProps {
  name: string;
  logo: string | null;
  jobTitle: string;
  location: string;
}

const Company = ({ name, logo, jobTitle, location }: CompanyProps) => {
  return (
    <View style={styles.container}>
      <Logo src={logo} size="large" />
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{name}</Text>
        <View style={styles.locationBox}>
          <Ionicons name="location-outline" size={14} color={COLORS.gray} />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
