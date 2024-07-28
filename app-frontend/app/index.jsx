import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="flex justify-center items-center">
      <Text className="text-3xl">Hello Welcome</Text>
      <Link href={"/home"}>
        <Text>Home</Text>
      </Link>
    </SafeAreaView>
  );
}
