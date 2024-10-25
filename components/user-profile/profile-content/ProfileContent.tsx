import { Text, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/common/button/Button";

import styles from "./profilecontent.style";

interface ProfileContentProps {
  onEditPress: () => void;
}

const ProfileContent = ({ onEditPress }: ProfileContentProps) => {
  const { user } = useAuth();
  const { email, location, preferences } = user!;
  const jobTitles = preferences?.split(",") ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Information</Text>
        <Button variant="ghost" text="Edit" onPress={onEditPress} />
      </View>
      <View style={styles.contentContainer}>
        <ProfileItem leftText="Email" rightText={email} />
        <ProfileItem
          leftText="Preferred Location"
          rightText={location ?? "Anywhere"}
        />
        <View>
          <Text style={[styles.itemText, styles.itemLeftText]}>
            Preferred Job Titles
          </Text>
          <View style={styles.preferenceContainer}>
            {jobTitles.map((item, index) => (
              <View key={index} style={styles.preferenceItem}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileContent;

const ProfileItem = ({
  leftText,
  rightText,
}: {
  leftText: string;
  rightText: string;
}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, styles.itemLeftText]}>{leftText}</Text>
      <Text style={styles.itemText}>{rightText}</Text>
    </View>
  );
};
