import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TagList from "../../components/TagList";
import FormField from "../../components/FormField";
import CommentList from "../../components/CommentCard";

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1
    }
}) 
    

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
      <View className="flex flex-row gap-4 justify-evenly">
        <TouchableOpacity>
          <Text>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Share</Text>
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
