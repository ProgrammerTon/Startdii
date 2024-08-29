import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TagList from "../../components/TagList";
import FormField from "../../components/FormField";
import CommentList from "../../components/CommentCard";
import images from "../../constants/images";
import { Image } from "expo-image";

const comments = [
  {
    id: "1",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "2",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "3",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "4",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "5",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "6",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
  {
    id: "7",
    ownerName: "Juaz",
    created_at: "22/07/24",
    content: "This is content",
  },
];


export default function SourceDetail() {
  const { id } = useLocalSearchParams();
  const title = "Title";
  const description = "This is description";
  const tags = ["Data", "Bruh"];
  const ownerName = "Best";
  const updated_at = "22/07/24 18:00";
  const score = 4.8;
  const count = 999;
  const questionamount = 10;
  const isanswer = true;
  const quizData = [
    {
      questionId: 1,
      question: "What does the cat says?",
      choicecount: 4,
      choice: ["Meaw", "AOUUU", "Miau", "Nyan"],
      isMultipleAnswer: false,
      answer : ["AOUUU"]
    },
    {
      questionId: 2,
      question: "How many legs does cat have",
      choicecount: 2,
      choice: ["2", "4"],
      isMultipleAnswer: false,
      answer : ["4"]
    },
    {
      questionId: 3,
      question: "ท่านประธานชอบรับประทานเมนูใดบ้าง",
      choicecount: 3,
      choice: ["กะเพราหมูกรอบ", "ผัดซีอิ๊ว", "หมูกรอบทอดเกลือ", "หมูกรอบคั่วพริกเกลือ"],
      isMultipleAnswer: true,
      answer : ["กะเพราหมูกรอบ", "หมูกรอบทอดเกลือ", "หมูกรอบคั่วพริกเกลือ"]
    },
    {
      questionId: 4,
      question: "3+2",
      choicecount: 0,
      choice: [],
      isMultipleAnswer: false,
      answer : ["5"]
    }
  ]
  const quizStart = async () => {
    
    router.push("/ArchiveSystem/D2_QuizMaker");
  };
  return (
    <ScrollView className="w-full">
      <Text className="text-3xl">{title}</Text>
      <Text className="text-xl">{description}</Text>
      <TagList tags={tags} title={title}></TagList>
      <View className="flex flex-row justify-between items-baseline">
        <Text>{updated_at}</Text>
        <View className="border-[#0270ED] border-opacity-100 border-2 p-2 rounded-xl bg-white">
          <Text>By {ownerName}</Text>
        </View>
      </View>
      <View className="flex flex-col gap-4 justify-evenly items-center">
        <TouchableOpacity onPress={quizStart}>
          <View className="flex flex-row gap-2 justify-center items-center bg-white p-2 rounded-xl drop-shadow-2xl w-[187px]">
            <Image
              className="w-[36px] h-[36px]"
              contentFit="contain"
              source={images.startbutton}
            />
            <Text className="text-xl font-bold text-[#0270ED]">START</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex flex-row gap-2 justify-center items-center bg-white p-2 rounded-xl drop-shadow-2xl w-[187px]">
            <Image
              className="w-[25.8px] h-[38.7px]"
              contentFit="contain"
              source={images.light}
            />
            <Text className="text-xl font-bold text-[#0270ED]">ANSWER</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-baseline">
        <Text className="font-bold text-xl">{score}</Text>
        <Text>({count})</Text>
      </View>

      <FormField placeholder="comment" />
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentList
            ownerName={item.ownerName}
            created_at={item.created_at}
            content={item.content}
          />
        )}
        keyExtractor={(item) => item.id}
        className="w-10/12"
      />
    </ScrollView>
  );
}
