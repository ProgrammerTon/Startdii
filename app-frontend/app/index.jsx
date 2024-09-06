import { View, Text, TouchableHighlight, ScrollView } from "react-native";
import { Redirect, router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Font from "expo-font";
import { useGlobalContext } from "../context/GlobalProvider";
import LogoutButton from "../components/LogoutButton";

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
          onPress={() => router.push("/sources/create")}
          className="bg-green-600 p-2 rounded-xl"
        >
          <Text className="text-lg">Create Note</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => router.push("/bottomtab/tab")}
          className="bg-green-600 p-2 rounded-xl"
        >
          <Text className="text-lg">test</Text>
        </TouchableHighlight>
        {isLogged ? <Text>Already Login</Text> : <Text>Not Login</Text>}
        {isLogged ? <Text>{user?.email}</Text> : null}
        <ScrollView>
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
            onPress={() => router.push("/trynaja")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">TNJ</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => router.push("/sources/create")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">Create Note</Text>
          </TouchableHighlight>
          {isLogged ? <Text>Already Login</Text> : <Text>Not Login</Text>}
          {isLogged ? <Text>{user?.email}</Text> : null}
          <TouchableHighlight
            onPress={() => router.push("/ArchiveSystem/ArchiveMainPage")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">Archive</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => router.push("/ArchiveSystem/D2_QuizMaker")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">D2_QuizMaker</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => router.push("/chatsystem/H1_user")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">Chat 2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => router.push("/guild/I1_GuildPage")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">Guild</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => router.push("/UserFinderSystem/G1_UserFinder")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">UserFinder</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => router.push("/ArchiveSystem/E2_NoteDetailed")}
            className="bg-green-600 p-2 rounded-xl"
          >
            <Text className="text-lg">NoteDetailed</Text>
          </TouchableHighlight>
          {isLogged ? <LogoutButton /> : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
