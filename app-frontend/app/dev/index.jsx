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
        onPress={() => router.push("/chatsystem/H3_user")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">ChatSearch</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/guild/I1_GuildPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Guild</Text>
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
        onPress={() => router.push("/favoritesSystem/FavoritePage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Favorite</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/F2.2_SumPageQuiz/F2.2_SumQuizPage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Quiz2</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/quizzes/PieChartQuestion")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">PieChart</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/reportsystem/ReportTest")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">TestReport</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/upload/upload")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">UploadFile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/profile/profile")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/dev/test_refresh")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Refresh Page</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/ArchiveSystem/SharePage")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Share Page</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/test_loading/test")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Test Loading</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => router.push("/profile/66cea26802136db1d334e56f")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Other Profile</Text>
      </TouchableHighlight>
      {isLogged ? <LogoutButton /> : null}
    </ScrollView>
  );
};

export default DevPage;

const styles = StyleSheet.create({});
