import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
}) {
  return (
    <TouchableOpacity
      className={`bg-[#0270ED] h-[44px] w-[92px] flex justify-center items-center rounded-2xl mt-5 drop-shadow-2xl ${containerStyles}`}
      onPress={handlePress}
    >
      <Text className={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}
