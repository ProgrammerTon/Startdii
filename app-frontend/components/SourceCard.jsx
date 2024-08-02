import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import images from "../constants/images";
import { Image } from "expo-image";
import { router } from "expo-router";
import TagList from "./TagList";

export default function SourceCard() {
  const title = "Data Mining";
  const author = "poyyykunggg";
  const tags = ["datasci", "datamining"];
  const id = "01";
  return (
    <TouchableOpacity onPress={() => router.push(`/sources/${id}`)}>
      <View className="bg-white w-full h-[100px] mt-[13px] flex flex-row rounded-[10px] overflow-hidden drop-shadow-2xl">
        <View className="w-[75px] h-[100px] mr-[6px] bg-[#FEDD3A] relative">
          <Image
            className="w-[88px] h-[66px] absolute -left-4 bottom-0"
            contentFit="contain"
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
          <TagList tags={tags} title={title}></TagList>
        </View>
      </View>
    </TouchableOpacity>
  );
}
