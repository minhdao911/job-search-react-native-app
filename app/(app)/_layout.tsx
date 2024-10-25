import { COLORS } from "@/constants";
import { Redirect, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator, View } from "react-native";

const queryClient = new QueryClient();

const HomeLayout = () => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/welcome" />;
  }

  if (!user?.isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      >
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default HomeLayout;
