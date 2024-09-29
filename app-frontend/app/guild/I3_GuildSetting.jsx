import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import ChatSearchBar from "../../components/ChatSearchBar";
import InviteCodeWindow from "./InviteCodeWindow";
import LeaveGuildWindow from "./LeaveGuildWindow";
import { useGuildContext } from "../../context/GuildProvider";
import { leavePerson } from "../../services/GuildService";
import { useGlobalContext } from "../../context/GlobalProvider";
import NoteGuildPage from "./I6_NoteGuild";
import QuizGuildPage from "./I7_QuizGuild";

const GuildSettingPage = () => {
  const guildName = "Test_guild";
  const [InviteWindowVisible, setInviteWindowVisible] = useState(false);
  const [LeaveGuildWindowVisible, setLeaveGuildWindowVisible] = useState(false);
  const { guild } = useGuildContext();
  const { user } = useGlobalContext();

  const openInviteWindow = () => {
    setInviteWindowVisible(true);
  };

  const closeInviteWindow = () => {
    setInviteWindowVisible(false);
  };

  const openLeaveWindow = () => {
    setLeaveGuildWindowVisible(true);
  };

  const closeLeaveWindow = () => {
    setLeaveGuildWindowVisible(false);
  };

  const handleLeave = () => {
    const transformdata = guild.memberIdList.map((item, index) => ({
      _id: item._id,
      id: index + 1, // Assign a sequential ID starting from 1
      username: `${item.username}`, // Combine firstname and lastname
      isAdmin: item.role === "leader", // Check if the role is 'admin'
      isViceAdmin: item.role === "vice-leader", // Check if the role is 'vice-admin'
    }));

    const data = leavePerson(user._id, transformdata, guild._id);
    if (data) {
      router.push("/");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{guildName}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/guild/I4_Member")}
        >
          <FontAwesome name="users" size={24} color="green" />
          <Text style={styles.buttonText}>MEMBER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openInviteWindow}>
          <Ionicons name="person-add" size={24} color="green" />
          <Text style={styles.buttonText}>INVITE</Text>
        </TouchableOpacity>
        <InviteCodeWindow
          visible={InviteWindowVisible}
          onClose={closeInviteWindow}
          code={guild.inviteCode}
        />

        {/* Search Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/guild/I5_Search");
          }}
        >
          <Ionicons name="search" size={24} color="green" />
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openLeaveWindow}>
          <Ionicons name="exit-outline" size={24} color="green" />
          <Text style={styles.buttonText}>LEAVE</Text>
        </TouchableOpacity>
        <LeaveGuildWindow
          visible={LeaveGuildWindowVisible}
          onClose={closeLeaveWindow}
          handleLeave={handleLeave}
        />
      </View>

      {/* Note and Quiz Buttons */}
      <View style={styles.noteQuizContainer}>
        <TouchableOpacity
          style={styles.noteButton}
          onPress={() =>
            router.push({
              pathname: "/guild/I6_NoteGuild",
              params: { room: guild._id },
            })
          }
        >
          <Text style={styles.noteQuizText}>Note</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quizButton}
          onPress={() =>
            router.push({
              pathname: "/guild/I7_QuizGuild",
              params: { room: guild._id },
            })
          }
        >
          <Text style={styles.noteQuizText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GuildSettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fca6cc",
    paddingVertical: 15,
    paddingHorizontal: 10,
    position: "relative",
    justifyContent: "center",
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    width: "20%",
    aspectRatio: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 8,
    color: "black",
    textAlign: "center",
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: "relative",
    justifyContent: "center",
  },
  noteQuizContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 30,
  },
  noteButton: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 100,
    alignItems: "center",
  },
  quizButton: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
  },
  noteQuizText: {
    fontSize: 30,
    color: "black",
    marginTop: 5,
    fontWeight: "bold",
  },
});