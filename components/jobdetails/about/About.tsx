import React from "react";
import { View, Text, ScrollView } from "react-native";
import { JobDetailsResponseData } from "@/types/jsearch";

import styles from "./about.style";

interface AboutProps {
  data: JobDetailsResponseData;
}

const About = ({ data }: AboutProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.headText}>About the job:</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contextText}>{data.job_description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;
