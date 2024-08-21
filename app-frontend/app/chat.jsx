import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Chat from "../components/Chat";

export default function ChatPage() {
  return (
    <SafeAreaView>
      <Text>Chat</Text>
      <Chat />
    </SafeAreaView>
  );
}
