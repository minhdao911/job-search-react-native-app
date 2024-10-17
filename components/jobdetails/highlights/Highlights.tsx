import { JobHighlights } from "@/types/jsearch";
import { ScrollView, Text, View } from "react-native";

import commonStyles from "@/styles/common";
import styles from "./highlights.style";

interface HighlightsProps {
  data?: JobHighlights;
}

const Highlights = ({ data }: HighlightsProps) => {
  return data ? (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.Qualifications && (
        <Specifics title="Qualifications:" points={data.Qualifications} />
      )}
      {data.Responsibilities && (
        <Specifics title="Responsibilities:" points={data.Responsibilities} />
      )}
      {data.Benefits && <Specifics title="Benefits:" points={data.Benefits} />}
    </ScrollView>
  ) : (
    <Text style={commonStyles.infoText}>No highlights</Text>
  );
};

export default Highlights;

interface SpecificsProps {
  title: string;
  points: string[];
}

const Specifics = ({ points, title }: SpecificsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pointsContainer}>
        {points.map((point, index) => (
          <View key={index} style={styles.pointWrapper}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
