import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { Slot } from "expo-router";
import QuestionProvider from "../../context/QuestionProvider";

export default function QuizLayout() {
  return (
    <QuestionProvider>
      <Slot />
    </QuestionProvider>
  );
}
