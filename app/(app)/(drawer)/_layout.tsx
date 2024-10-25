import { AppHeader } from "@/components";
import { COLORS } from "@/constants";
import Drawer from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: COLORS.tertiary,
        drawerActiveBackgroundColor: COLORS.white,
        header: ({ navigation }) => (
          <AppHeader
            onMenuPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          drawerLabel: "Favorites",
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
