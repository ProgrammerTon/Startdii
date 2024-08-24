import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

export default function Home() {
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-xl">Home</Text>
      <Text></Text>
    </SafeAreaView>
  );
}
