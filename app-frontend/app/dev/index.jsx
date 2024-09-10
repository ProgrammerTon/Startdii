import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import LogoutButton from "../../components/LogoutButton";
import { router } from "expo-router";

const DevPage = () => {
  const { isLogged, user } = useGlobalContext();
  return (
    <ScrollView>
      <TouchableHighlight
        onPress={() => router.push("/trynaja")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">TNJ</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => router.push("/sources/create")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Create Note</Text>
      </TouchableHighlight>
      {isLogged ? <Text>Already Login</Text> : <Text>Not Login</Text>}
      {isLogged ? <Text>{user?.email}</Text> : null}
      <TouchableHighlight
        onPress={() => router.push("/ArchiveSystem/ArchiveMainPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Archive</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/ArchiveSystem/D1_AddQuizPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">D1_AddQuizPage</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/ArchiveSystem/D2_QuizMaker")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">D2_QuizMaker</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/chatsystem/H1_user")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Chat 2</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/guild/I1_GuildPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Guild</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/UserFinderSystem/G1_UserFinder")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">UserFinder</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/ArchiveSystem/E2_NoteDetailed")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">NoteDetailed</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/bottomtab/tab")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">test</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/F2.1_FirstPageQuiz/F2.1_FirstQuizPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Quiz</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/F2.2_SumPageQuiz/F2.2_SumQuizPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Quiz2</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/quiz/66da76bead73dfed0f571ecc")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">QuizID1</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/quiz/66d005e69a4ee7cfdad9beee")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">QuizID2</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/quizzes/F3_quizflow")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">QuizFlow</Text>
      </TouchableHighlight>
      {isLogged ? <LogoutButton /> : null}
    </ScrollView>
  );
};

export default DevPage;

const styles = StyleSheet.create({});
