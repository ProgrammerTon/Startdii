import { View, Text, SafeAreaView, StatusBar,StyleSheet } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";
import GuildProvider from "../context/GuildProvider";
import { CharacterProvider } from "./profile/charcontext";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <GuildProvider>
        <CharacterProvider>
          <SafeAreaView style={styles.container}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="chatsystem" options={{ headerShown: false }} />
                <Stack.Screen name="chatroom/[room]" options={{ headerShown: false }} />
                <Stack.Screen name="guild" options={{ headerShown: false }} />
                <Stack.Screen name="inventorynote" options={{ headerShown: false }} />
                <Stack.Screen name="inventoryquiz" options={{ headerShown: false }} />
                <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="quiz" options={{ headerShown: false }} />
                <Stack.Screen name="ArchiveSystem" options={{ headerShown: false }} />
                <Stack.Screen name="sources/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="quizzes/F6_quizfillsolution" options={{ headerShown: false }} />
                <Stack.Screen name="quizzes/F6_quizchoicesolution" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaView>
        </CharacterProvider>
      </GuildProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // This ensures your content doesn't overlap with the status bar
  },
});