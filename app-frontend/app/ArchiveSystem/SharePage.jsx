import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Modal, Alert } from 'react-native';
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Menu from "./FriendGuildMenu";
import FriendGuildList from "./FriendGuildList";
import { getChatList } from "../../services/ChatListService";
import { guildList } from "../../services/GuildService";

const { width, height } = Dimensions.get('window');

export default function SharePage() {
  const [activeMenu, setActiveMenu] = useState("Friends");
  const [guilds, setGuilds] = useState([]);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [selectedGuilds, setSelectedGuilds] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [comfirmShare, setConfirmShare] = useState(false);

  // Fetch friends data
  const loadFriendsData = async () => {
    try {
      const chatList = await getChatList();
      const filteredData = chatList.map((chat) => ({
        username: chat.userId.username,
        url: `/chatroom/${chat.chatroom}`,
      }));
      setFriends(filteredData);
      setRefreshing(false);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  };

  // Fetch guilds data
  const loadGuildsData = async () => {
    try {
      const guildsData = await guildList();
      const formattedGuilds = guildsData.map((guild) => ({
        id: guild._id,
        color: "#FF6347",
        badgeColor: "#2ecc71",
        title: guild.name,
        description: guild.description + ".",
        members: guild.memberIdList.length,
      }));
      setGuilds(formattedGuilds);
      setRefreshing(false);
    } catch (error) {
      console.error("Error loading guilds:", error);
    }
  };

  useEffect(() => {
    loadFriendsData();
    loadGuildsData();
  }, []);

  const menuData = [
    { name: 'Friends' }, { name: 'Guilds' }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "Friends":
        return (
          <ScrollView>
            {friends.map((item, index) => (
              <FriendGuildList
                key={index}
                content={item}
                isSelected={selectedFriends.includes(index)}
                onPress={() => handleFriendSelect(index)}
              />
            ))}
          </ScrollView>
        );
      case "Guilds":
        return (
          <ScrollView>
            {guilds.map((item, index) => (
              <FriendGuildList
                key={index}
                content={item}
                isSelected={selectedGuilds.includes(index)}
                onPress={() => handleGuildSelect(index)}
              />
            ))}
          </ScrollView>
        );
      default:
        return (
          <ScrollView>
            {friends.map((item, index) => (
              <FriendGuildList
                key={index}
                content={item}
                isSelected={selectedFriends.includes(index)}
                onPress={() => handleFriendSelect(index)}
              />
            ))}
          </ScrollView>
        );
    }
  };

  const handleFriendSelect = (index) => {
    // Allow multiple selections
    if (selectedFriends.includes(index)) {
      const newSelectedFriends = selectedFriends.filter(item => item !== index);
      setSelectedFriends(newSelectedFriends);
    } else {
      setSelectedFriends([...selectedFriends, index].sort());
    }
  };

  const handleGuildSelect = (index) => {
    // Allow multiple selections
    if (selectedGuilds.includes(index)) {
      const newSelectedGuilds = selectedGuilds.filter(item => item !== index);
      setSelectedGuilds(newSelectedGuilds);
    } else {
      setSelectedGuilds([...selectedGuilds, index].sort());
    }
  };

  const handleShare = () => {
    if (selectedGuilds.length === 0 && selectedFriends.length === 0) {
      setConfirmShare(false);
      Alert.alert("Select at least 1 friend or guild!!");
    } else {
      console.log("Sharing with friends:", selectedFriends, "guilds:", selectedGuilds);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeQuiz}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color="blue" />
        </TouchableOpacity>
        <Text style={styles.title}>Share with</Text>
      </View>
      <View style={styles.selection}>
        <Menu menuData={menuData} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>
      <View>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => setConfirmShare(true)}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}> Share </Text>
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={comfirmShare}>
        <View style={{ flex: 1, backgroundColor: "#555555aa" }}>
          <View style={styles.sharePopUp}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Do you want to Share?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelShareButton}
                onPress={() => setConfirmShare(false)}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmShareButton}
                onPress={handleShare}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: "#20AAFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeQuiz: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  selection: { marginVertical: 20, width: width * 0.7, alignSelf: "center" },
  content: { flex: 1, paddingHorizontal: 20 },
  shareButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginRight: 20,
    marginTop: height * 0.02,
    marginBottom: height * 0.05,
    backgroundColor: "#0270ED",
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  sharePopUp: {
    backgroundColor: "#fff",
    marginTop: height * 0.4,
    margin: 50,
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    height: height * 0.15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelShareButton: {
    backgroundColor: "#bbb",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
  },
  confirmShareButton: {
    backgroundColor: "#0270ED",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
  },
});
