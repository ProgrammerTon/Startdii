import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { Slot } from "expo-router";
import QuizProvider from "../../context/QuizProvider";
import QuizFill from "./F3_quizfill"; // Make sure this path is correct

export default function QuizLayout() {
  return (
    <QuizProvider> {/* Wrap with provider if needed */}
      <Stack>
        <Stack.Screen
          name="QuizFill"
          options={{ headerShown: false }} // This will hide the header for QuizFill
        />
        <Slot />
      </Stack>
    </QuizProvider>
  );
}
