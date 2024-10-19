import { COLORS } from "@/constants";
import { Redirect, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/providers/AuthProvider";

const queryClient = new QueryClient();

const HomeLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/welcome" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitle: "",
          }}
        />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default HomeLayout;
