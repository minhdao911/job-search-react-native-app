import { Text, TouchableOpacity, View } from "react-native";
import Logo from "../../logo/Logo";
import { JobSearchResponseData } from "@/types/jsearch";
import { getLocation } from "@/utils";
import { COLORS } from "@/constants";
import Button from "../../button/Button";

import styles from "./searchresultcard.style";

interface SearchResultCardProps {
  item: JobSearchResponseData;
  onPress: () => void;
}

const SearchResultCard = ({ item, onPress }: SearchResultCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Logo size="small" src={item.employer_logo} />
      <View style={styles.textContainer}>
        <Text style={styles.companyName}>{item.employer_name}</Text>
        <Text style={styles.jobName}>{item.job_title}</Text>
        <Text style={styles.location}>{getLocation(item)}</Text>
      </View>
      <Button
        variant="icon"
        icon="heart-outline"
        iconColor={COLORS.gray2}
        activeOpacity={1}
        style={{ backgroundColor: "transparent" }}
      />
    </TouchableOpacity>
  );
};

export default SearchResultCard;
