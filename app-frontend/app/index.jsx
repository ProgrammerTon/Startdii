import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-3xl">Hello Welcome to</Text>
      <Text className="text-3xl">Startdii</Text>
      <Link href={"/home"}>
        <Text>Home</Text>
      </Link>
    </SafeAreaView>
  );
}
