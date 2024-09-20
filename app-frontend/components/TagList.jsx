import { View, Text } from "react-native";
import React from "react";

export default function TagList({ tags=[], title, id }) {
  return (
    <View className="flex flex-row gap-3">
      {tags.map((tag, i) => {
        return (
          <View className="bg-[#D9D9D9] p-1 rounded-xl" key={`${tag}-${id}`}>
            <Text className="font-semibold">#{tag}</Text>
          </View>
        );
      })}
    </View>
  );
}
