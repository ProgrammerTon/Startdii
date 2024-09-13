import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Redirect, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GuildCreateWindow from "./GuildCreate";
import GuildJoinWindow from "./GuildJoin";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { joinGuildByCode } from "../../services/GuildService";

const CreateJoinGuild = ({ visible, onClose, loadData }) => {
  const [createGuild, setCreateGuild] = useState(false);
  const [joinGuild, setJoinGuild] = useState(false);
  const [guildCode, setGuildCode] = useState("");
  
  const handleChangeText = (e) => setGuildCode(e);

  const onJoinGuild = async () => {
    try {
      const data = await joinGuildByCode(guildCode);
      if (!data) {
        Alert.alert("Join Failed");
      } else {
        Alert.alert("Join Success");
        loadData();
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const openCreateGuildWindow = () => {
    setCreateGuild(true);
  };

  const closeCreateGuildWindow = () => {
    setCreateGuild(false);
  };

  const openJoinGuildJoinWindow = () => {
    setJoinGuild(true);
  };

  const closeJoinGuildWindow = () => {
    setJoinGuild(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.InteractButton}
            onPress={openJoinGuildJoinWindow}
          >
            <FontAwesome6 name="door-open" size={20} color="#ffffff" />
          </TouchableOpacity>
          <GuildJoinWindow
            visible={joinGuild}
            onClose={closeJoinGuildWindow}
            value={guildCode}
            handleChangeText={handleChangeText}
            onPress={onJoinGuild}
          />

          <TouchableOpacity
            style={styles.InteractButton}
            onPress={openCreateGuildWindow}
          >
            <Feather name="plus-circle" size={20} color="#ffffff" />
          </TouchableOpacity>
          <GuildCreateWindow
            visible={createGuild}
            onClose={closeCreateGuildWindow}
            loadData={loadData}
          />

          <TouchableOpacity style={styles.InteractButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    left: 236,
    bottom: 30,
  },
  modalContent: {
    width: "30%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    bottom: 20,
    right: -30,
  },
  InteractButton: {
    backgroundColor: "#fc8601",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateJoinGuild;
