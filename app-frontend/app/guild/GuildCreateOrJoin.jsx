import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Alert,
  Dimensions,
  TouchableWithoutFeedback
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
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width, height } = Dimensions.get('window');

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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.fullscreenOverlay}>
          {/* This is the fullscreen touchable overlay */}
        </View>
      </TouchableWithoutFeedback>
      
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.joinContainer}>
            <Text style={[fonts.EngBold16, styles.text]}>Join</Text>
            <TouchableOpacity
              style={styles.InteractButton}
              onPress={openJoinGuildJoinWindow}
            >
              <FontAwesome6 name="door-open" size={22} color={colors.red} />
            </TouchableOpacity>
          </View>
          <GuildJoinWindow
            visible={joinGuild}
            onClose={closeJoinGuildWindow}
            value={guildCode}
            handleChangeText={handleChangeText}
            onPress={onJoinGuild}
          />

          <View style={styles.joinContainer}>
            <Text style={[fonts.EngBold16, styles.text]}>Create</Text>
            <TouchableOpacity
              style={styles.InteractButton}
              onPress={openCreateGuildWindow}
            >
              <Feather name="plus-circle" size={28} color={colors.red} />
            </TouchableOpacity>
          </View>
          <GuildCreateWindow
            visible={createGuild}
            onClose={closeCreateGuildWindow}
            loadData={loadData}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(145, 145, 145, 0.5)', // Semi-transparent background
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(145, 145, 145, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: height * 0.17,
    right: width * -0.615,
  },
  modalContent: {
    width: "30%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    bottom: 10,
    right: -35,
  },
  InteractButton: {
    borderRadius: 30,
    width: 55,
    height: 55,
    backgroundColor: colors.white,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: colors.red,
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.red,
    position: "absolute",
    zIndex: 1,
    right: 70,
  },
  joinContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateJoinGuild;
