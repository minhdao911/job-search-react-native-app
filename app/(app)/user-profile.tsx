import {
  Button,
  ProfileContent,
  ProfileEditForm,
  ProfileHeader,
  ScreenContainer,
} from "@/components";
import { COLORS, SIZES } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const UserProfile = () => {
  const { signOut } = useAuth();

  const [isEdit, setIsEdit] = useState(false);

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
    <ScreenContainer>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.gray3,
          },
        }}
      />
      <ProfileHeader />
      {isEdit ? (
        <ProfileEditForm onSavePress={() => setIsEdit(false)} />
      ) : (
        <ProfileContent onEditPress={() => setIsEdit(true)} />
      )}
      <View style={styles.footerContainer}>
        <Button variant="secondary" text="Log out" onPress={handleSignOut} />
      </View>
    </ScreenContainer>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 50,
    left: SIZES.large,
    right: SIZES.large,
  },
});
