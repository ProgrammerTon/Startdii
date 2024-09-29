import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { Slot } from "expo-router";
import QuizProvider from "../../context/QuizProvider";

export default function QuizLayout() {
  return (
    <QuizProvider>
      <Slot />
    </QuizProvider>
  );
}
