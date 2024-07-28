import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <View className="w-full h-full flex-1">
      <Slot />
    </View>
  );
}
