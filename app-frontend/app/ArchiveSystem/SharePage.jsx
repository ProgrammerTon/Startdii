import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, RefreshControl, TouchableOpacity, Dimensions, ScrollView, Modal, Alert } from 'react-native';
import { Redirect, router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import Menu from "./FriendGuildMenu";
import FriendGuildList from "./FriendGuildList";
const { width, height } = Dimensions.get('window');

export default function SharePage() {
  const [activeMenu, setActiveMenu] = useState("Friends");
  const [guilds, setGuilds] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [selectedGuilds, setSelectedGuilds] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [comfirmShare, setConfirmShare] = useState(false);

  const menuData = [
    { name: 'Friends' } , { name: 'Guilds' }
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case "Friends":
        return (
          <ScrollView>
            {loadFriendsData.map((item, index) => {
              return (
                <FriendGuildList
                  key={index}
                  content={item}
                  isSelected={selectedFriends.includes(index)}
                  onPress={() => handleFriendSelect(index)}
                />
              );
            })}
          </ScrollView>
        );
      case "Guilds":
        return (
          <ScrollView>
            {loadGuildsData.map((item, index) => {
              return (
                <FriendGuildList
                  key={index}
                  content={item}
                  isSelected={selectedGuilds.includes(index)}
                  onPress={() => handleGuildSelect(index)}
                />
              );
            })}
          </ScrollView>
        );
      default:
        return (
          <ScrollView>
            {loadFriendsData.map((item, index) => {
              return (
                <FriendGuildList
                  key={index}
                  content={item}
                  isSelected={selectedFriends.includes(index)}
                  onPress={() => handleFriendSelect(index)}
                />
              );
            })}
          </ScrollView>
        );
    }
  };

  const menuItems = [
    { id: "1", name: "Friends" },
    { id: "2", name: "Guilds" },
  ];

  const loadGuildsData = [
    {
      id: 1,
      title: "เรารู้เขารู้เรา",
    },
    {
      id: 2,
      title: "แต่เขาแกล้งรู้เรา",
    },
  ]

  const loadFriendsData = [
    {
      id: 1,
      title: "Mr.BOB",
    },
    {
      id: 2,
      title: "Juaz Juazzz",
    },
    {
      id: 3,
      title: "tonkung",
    },
  ]

  const handleFriendSelect = (index) => {
    // Allow multiple selections
    if (selectedFriends.includes(index)) {
      const newSelectedFriends = selectedFriends.filter(
        (item) => item !== index
      );
      setSelectedFriends(newSelectedFriends); // Unselect if the same index is pressed
    } else {
      const newSelectedFriends = [...selectedFriends, index].sort(); // Sort the array after adding the new index
      setSelectedFriends(newSelectedFriends); // Select the new index
    }
  };

  const handleGuildSelect = (index) => {
    // Allow multiple selections
    if (selectedGuilds.includes(index)) {
      const newSelectedGuilds = selectedGuilds.filter(
        (item) => item !== index
      );
      setSelectedGuilds(newSelectedGuilds); // Unselect if the same index is pressed
    } else {
      const newSelectedGuilds = [...selectedGuilds, index].sort(); // Sort the array after adding the new index
      setSelectedGuilds(newSelectedGuilds); // Select the new index
    }
  };

  const handleShare = () => {
    if (selectedGuilds.length === 0 && selectedFriends.length === 0) {
      setConfirmShare(false)
      Alert.alert("Select at least 1 friend or guild!!");
    }
    else {
      console.log(selectedFriends, selectedGuilds)
    }
  }

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
          onPress={() => {console.log(selectedFriends, selectedGuilds), setConfirmShare(true)}}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}> Share </Text>
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={comfirmShare}>
        <View style={{ flex: 1, backgroundColor: "#555555aa" }}>
          <View style={styles.sharePopUp}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                Do you want to Share?{" "}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={styles.cancelShareButton}
                onPress={() => setConfirmShare(false)}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {" "}
                  Cancel{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmShareButton}
                onPress={() => handleShare()}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                >
                  {" "}
                  Share{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  selection: {
    marginVertical: 20,
    width: width*0.7,
    alignSelf: "center",
  },
  selectionText: {
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  shareButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginRight: 20,
    marginBottom: height * 0.05,
    backgroundColor: "#0270ED",
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  cancelShareButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#bbb",
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  confirmShareButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#0270ED",
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
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
});