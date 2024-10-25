import { COLORS } from "@/constants";
import { Redirect, Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator, View } from "react-native";
import { Button } from "@/components";

const queryClient = new QueryClient();

const HomeLayout = () => {
  const router = useRouter();
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
          headerLeft: () => (
            <Button
              variant="icon"
              icon="arrow-back"
              onPress={() => router.back()}
            />
          ),
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
