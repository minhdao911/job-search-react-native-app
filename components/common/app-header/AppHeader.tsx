import { Alert, SafeAreaView, View } from "react-native";
import Button from "../button/Button";
import { useAuth } from "@/providers/AuthProvider";

import styles from "./appheader.style";

interface AppHeaderProps {
  onMenuPress: () => void;
}

const AppHeader = ({ onMenuPress }: AppHeaderProps) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Unexpected error while signing out",
        "Cannot sign out, please try again"
      );
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <Button variant="icon" icon="menu" onPress={onMenuPress} />
        <Button variant="icon" icon="person" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
