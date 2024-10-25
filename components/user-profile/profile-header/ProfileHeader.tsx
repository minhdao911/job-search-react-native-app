import { Image, Text, View } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import Button from "@/components/common/button/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

import styles from "./profileheader.style";
import { icons } from "@/constants";
import dayjs from "dayjs";

const ProfileHeader = () => {
  const { user } = useAuth();
  const { photoUrl, name, created } = user!;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBlock} />
      <View style={styles.profileImgContainer}>
        <View style={styles.profileImgBox}>
          <Image
            style={styles.profileImg}
            source={photoUrl ? { uri: photoUrl } : icons.avatar}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.joinText}>
          Joined {dayjs(created).format("MMM YYYY")}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
