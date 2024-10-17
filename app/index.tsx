import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, icons, SIZES } from "../constants";
import { Stack } from "expo-router";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "@/components";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <LinearGradient
        colors={[COLORS.lightWhite, COLORS.white]}
        start={{
          x: 0,
          y: 0.3,
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension={20} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.profile} dimension={30} />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.large }}>
          <Welcome />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
