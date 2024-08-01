import { View, Text } from "react-native";
import React from "react";
import images from "../constants/images";
import { Image } from "expo-image";

export default function SourceCard() {
  const title = "Data Mining";
  const author = "poyyykunggg";
  const tags = ["datasci", "datamining"];
  return (
    <View className="bg-white w-[295px] h-[100px] mt-[13px] flex flex-row rounded-[10px] overflow-hidden drop-shadow-2xl">
      <View className="w-[75px] h-[100px] mr-[6px] bg-[#FEDD3A] relative">
        <Image
          className="w-[88px] h-[66px] absolute -left-4 bottom-0"
          resizeMode="contain"
          source={images.book}
          style={{ top: "50%", transform: [{ translateY: -33 }] }}
        />
        <Text className="absolute bottom-0 left-2 text-sm text-[#8888]">
          1 day ago
        </Text>
      </View>
      <View className="">
        <Text className="text-lg font-semibold">{title}</Text>
        <Text className="text-sm text-gray-500">By {author}</Text>
        <View className="flex flex-row gap-3">
          {tags.map((tag, i) => {
            return (
              <View
                className="bg-[#D9D9D9] p-1 rounded-xl"
                id={`${tag}-${i}-${title}`}
              >
                <Text className="font-semibold">#{tag}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
