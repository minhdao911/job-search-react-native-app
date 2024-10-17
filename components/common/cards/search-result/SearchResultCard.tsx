import { Text, TouchableOpacity, View } from "react-native";
import Logo from "../../logo/Logo";
import { JobSearchResponseData } from "@/types/jsearch";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getLocation } from "@/utils";
import { COLORS } from "@/constants";

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
      <TouchableOpacity activeOpacity={1}>
        <Ionicons name="heart-outline" size={20} color={COLORS.gray2} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
