import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import SafeAreaViewAndroid from "../../components/SafeAreaViewAndroid";

export default function Profile() {
  const { isLogged, user } = useGlobalContext();
  return (
    <SafeAreaViewAndroid>
      <Text>Profile</Text>
      <TouchableHighlight
        onPress={() => router.push("/dev")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Dev</Text>
      </TouchableHighlight>
    </SafeAreaViewAndroid>
  );
}
