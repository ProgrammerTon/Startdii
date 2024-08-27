import { View, Text, TouchableHighlight } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { user, isLogged } = useGlobalContext();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <StatusBar style="auto" />
      <Text className="text-3xl">Hello Welcome to</Text>
      <Text className="text-3xl">Startdii</Text>
      <TouchableHighlight
        onPress={() => router.push("/home")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Home</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/sign-up")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Sign Up</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/sign-in")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Sign In</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/sources/create")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Create Note</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/chat")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Chat Button</Text>
      </TouchableHighlight>
      {isLogged ? <Text>Already Login</Text> : <Text>Not Login</Text>}
      {isLogged ? <Text>{user?.email}</Text> : null}
    </SafeAreaView>
  );
}
