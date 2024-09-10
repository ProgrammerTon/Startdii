import { View, Text, TouchableHighlight } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        InterLight: require("../assets/fonts/Inter_18pt-Light.ttf"),
        InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
        InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
        InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
        InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
        IBMLight: require("../assets/fonts/IBMPlexSansThai-Light.ttf"),
        IBMRegular: require("../assets/fonts/IBMPlexSansThai-Regular.ttf"),
        IBMMedium: require("../assets/fonts/IBMPlexSansThai-Medium.ttf"),
        IBMSemiBold: require("../assets/fonts/IBMPlexSansThai-SemiBold.ttf"),
        IBMBold: require("../assets/fonts/IBMPlexSansThai-Bold.ttf"),
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (fontsLoaded) {
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
          onPress={() => router.push("/dress")}
          className="bg-green-600 p-2 rounded-xl"
        >
          <Text className="text-lg">dress</Text>
        </TouchableHighlight>

        

      
        <TouchableHighlight
          onPress={() => router.push("/sources/create")}
          className="bg-green-600 p-2 rounded-xl"
        >
          <Text className="text-lg">Create Note</Text>
        </TouchableHighlight>
        {isLogged ? <Text>Already Login</Text> : <Text>Not Login</Text>}
        {isLogged ? <Text>{user?.email}</Text> : null}
      </SafeAreaView>
    );
  }
}
