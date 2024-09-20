import { View, Text, TouchableHighlight, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { useGlobalContext } from "../context/GlobalProvider";
import LogoutButton from "../components/LogoutButton";
import { getCurrentUser } from "../utils/asyncstroage";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, isLogged, setIsLogged } = useGlobalContext();

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

    async function checkUser() {
      const data = await getCurrentUser();
      if (data) setIsLogged(true);
    }

    checkUser();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  if (!isLogged) {
    return <Redirect href="/sign-in" />;
  } else {
    return <Redirect href="/profile" />;
  }
}
