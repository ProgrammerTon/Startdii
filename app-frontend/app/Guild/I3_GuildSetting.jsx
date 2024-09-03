import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import ChatSearchBar from "../../components/ChatSearchBar";
import InviteCodeWindow from "./InviteCodeWindow";
import LeaveGuildWindow from "./LeaveGuildWindow";

const GuildSettingPage = () => {
  const guildName = "Test_guild";
  const [InviteWindowVisible, setInviteWindowVisible] = useState(false);
  const [LeaveGuildWindowVisible, setLeaveGuildWindowVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePress = () => {
    setIsMuted(!isMuted);
  };

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{guildName}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <FontAwesome
            name={isMuted ? "volume-off" : "volume-up"}
            size={24}
            color="green"
          />
          <Text style={styles.buttonText}>{isMuted ? "MUTE" : "UNMUTE"}</Text>
        </TouchableOpacity>

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
        />

        <TouchableOpacity style={styles.button} onPress={openLeaveWindow}>
          <Ionicons name="exit-outline" size={24} color="green" />
          <Text style={styles.buttonText}>LEAVE</Text>
        </TouchableOpacity>
        <LeaveGuildWindow
          visible={LeaveGuildWindowVisible}
          onClose={closeLeaveWindow}
        />
      </View>
      <View style={styles.SearchContainer}>
        <ChatSearchBar />
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
  backButton: {
    marginRight: 10,
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
});
