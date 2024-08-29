import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import Componentchatuser from "./Componentchatuser";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getChatList } from "../../services/ChatListService";

// Get screen width for responsive design
const { width } = Dimensions.get("window");

const ChatH1 = () => {
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const { user, isLogged } = useGlobalContext();
  const [chatComponents, setChatComponents] = useState([
    {
      username: "Mr.BOB",
      url: "/chatroom/1",
    },
    {
      username: "Room 1",
      url: "/chatroom/2",
    },
    {
      username: "Room 2",
      url: "/chatroom/3",
    },
  ]);

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else {
      loadUserData();
      setRefreshing(false);
    }
  }, []);

  const loadUserData = async () => {
    const chatList = await getChatList();
    const filteredData = chatList.map((chat) => ({
      username: chat.userId.username,
      url: `/chatroom/${chat.chatroom}`,
    }));
    setRefreshing(false);
    setUserData(filteredData);
    // fetch("https://randomuser.me/api/?results=8")
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setRefreshing(false);
    //     var newdata = userData.concat(responseJson.results);
    //     setUserData(newdata);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const addChatComponent = () => {
    setChatComponents([...chatComponents, { id: Date.now() }]);
  };

  const deleteChatComponent = (idToRemove) => {
    const updatedChatComponents = chatComponents.filter(
      (chatComponent) => chatComponent.id !== idToRemove
    );
    setChatComponents(updatedChatComponents);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chat</Text>
      </View>

      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        enableEmptySections={true}
        renderItem={Componentchatuser}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
      />
      {/* {chatComponents.map((chatComponent, ind) => (
        <View
          key={`${chatComponent.id}-${ind}`}
          style={styles.chatItemContainer}
        >
          <Componentchatuser item={chatComponent} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteChatComponent(chatComponent.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))} */}

      {/* <TouchableOpacity style={styles.addButton} onPress={addChatComponent}>
        <Text style={styles.addButtonText}>Add Chat</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButtonText}>Add Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    backgroundColor: "#007bff", // Blue background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    width: width - 40, // Responsive width
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Padding to avoid clipping content
  },
  chatItemContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 40, // Responsive width
    alignSelf: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    width: width - 40, // Responsive width
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChatH1;
