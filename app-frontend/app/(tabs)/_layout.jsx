import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

export default function TabsLayout() {
  return (
    <View className="h-full">
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: "Profile", headerShown: false }}
        />
        <Tabs.Screen
          name="guild"
          options={{ title: "Guild", headerShown: false }}
        />
      </Tabs>
    </View>
  );
}
