import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import LogoutButton from "../../components/LogoutButton";

const DevPage = () => {
  const { isLogged, user } = useGlobalContext();
  return (
    <View>
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
      {isLogged ? <LogoutButton /> : null}
    </View>
  );
};

export default DevPage;

const styles = StyleSheet.create({});
