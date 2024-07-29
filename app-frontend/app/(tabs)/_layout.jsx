import { View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

export default function TabsLayout() {
  return (
    <View className="h-full">
      <Tabs>
        <Tabs.Screen
          name="home/index"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{ title: "Profile", headerShown: false }}
        />
        <Tabs.Screen
          name="guild/index"
          options={{ title: "Guild", headerShown: false }}
        />
        <Tabs.Screen
          name="source/index"
          options={{ title: "Source", headerShown: false }}
        />
      </Tabs>
    </View>
  );
}