import { SafeAreaView, View } from "react-native";
import Button from "../button/Button";
import { useRouter } from "expo-router";

import styles from "./appheader.style";

interface AppHeaderProps {
  onMenuPress: () => void;
}

const AppHeader = ({ onMenuPress }: AppHeaderProps) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <Button variant="icon" icon="menu" onPress={onMenuPress} />
        <Button
          variant="icon"
          icon="person"
          onPress={() => router.push("/user-profile")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
