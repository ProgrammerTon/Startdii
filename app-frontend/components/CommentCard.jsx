import { View, Text } from "react-native";
import React from "react";

export default function CommentCard({ ownerName, created_at, content }) {
  return (
    <View className="flex flex-col w-full bg-white p-3 my-3 rounded-xl drop-shadow-2xl">
      <View className="flex flex-row justify-between">
        <Text>{ownerName}</Text>
        <Text>{created_at}</Text>
      </View>
      <Text>{content}</Text>
    </View>
  );
}
