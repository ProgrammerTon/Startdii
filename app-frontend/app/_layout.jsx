import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";
import { CharacterProvider } from "./profile/charcontext";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <CharacterProvider>
        <Stack>
          <Stack.Screen name="guild" options={{ headerShown: true }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </CharacterProvider>
    </GlobalProvider>
  );
}
