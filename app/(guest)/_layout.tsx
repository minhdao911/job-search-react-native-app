import { COLORS } from "@/constants";
import { Stack } from "expo-router";

const GuestLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
};

export default GuestLayout;
