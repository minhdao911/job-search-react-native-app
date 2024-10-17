import React from "react";
import { View, Text, Image } from "react-native";
import Logo from "../../common/logo/Logo";
import { icons } from "@/constants";

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
          <Image style={styles.locationImage} source={icons.location} />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
