import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SourceCard from "../../components/SourceCard";
import QuizCard from "../../components/QuizCard";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    type: "source",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    type: "source",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    type: "quiz",
  },
];

const Item = ({ title, type }) => {
  if (type == "source") {
    return <SourceCard title={title} />;
  }
  return <QuizCard title={title} />;
};

export default function Source() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-3xl">Source Page</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} type={item.type} />}
        keyExtractor={(item) => item.id}
        className="w-10/12"
      />
    </SafeAreaView>
  );
}
