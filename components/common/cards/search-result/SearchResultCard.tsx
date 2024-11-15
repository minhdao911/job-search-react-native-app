import { Text, TouchableOpacity, View } from "react-native";
import Logo from "../../logo/Logo";
import { JobSearchResponseData } from "@/types/jsearch";
import {
  getEmploymentTypeText,
  getJobPostedTime,
  getLocationText,
} from "@/utils";
import { COLORS } from "@/constants";
import Button from "../../button/Button";

import styles from "./searchresultcard.style";

interface SearchResultCardProps {
  item: JobSearchResponseData;
  hasFavIcon?: boolean;
  isFavorite?: boolean;
  onPress: () => void;
  onFavPress?: () => void;
}

const SearchResultCard = ({
  item,
  isFavorite,
  hasFavIcon = true,
  onPress,
  onFavPress,
}: SearchResultCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Logo size="small" src={item.employer_logo} />
        <View style={styles.textContainer}>
          <Text style={styles.companyName}>{item.employer_name}</Text>
          <Text style={styles.jobName}>{item.job_title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.jobType}>
              {getEmploymentTypeText(item.job_employment_type)} -
            </Text>
            <Text style={styles.location}>{getLocationText(item)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        {hasFavIcon ? (
          <Button
            variant="icon"
            icon={isFavorite ? "heart" : "heart-outline"}
            iconColor={isFavorite ? COLORS.tertiary : COLORS.gray2}
            activeOpacity={1}
            style={{ backgroundColor: "transparent" }}
            onPress={onFavPress}
          />
        ) : (
          <View style={{ height: 35 }} />
        )}
        <Text style={styles.timeText}>
          {getJobPostedTime(item.job_posted_at_datetime_utc)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
