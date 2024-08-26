import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
}
