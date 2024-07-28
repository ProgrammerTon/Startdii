import { View, Text } from "react-native";
import { Slot } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <View>
      <Text>TabsLayout</Text>
      <Slot />
    </View>
  );
}
