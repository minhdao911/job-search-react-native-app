import { Button } from "@/components";
import { COLORS } from "@/constants";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <Button variant="icon" icon="menu" />,
          headerRight: () => <Button variant="icon" icon="people" />,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
