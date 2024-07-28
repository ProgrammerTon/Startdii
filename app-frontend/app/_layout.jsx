import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <View>
      <Text>RootLayout</Text>
      <Slot></Slot>
    </View>
  );
}
