import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";
import GuildProvider from "../context/GuildProvider";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <GuildProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </GuildProvider>
    </GlobalProvider>
  );
}
