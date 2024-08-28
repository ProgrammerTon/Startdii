import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Componentchatuser from "./Componentchatuser";
import { router } from "expo-router";

// Get screen width for responsive design
const { width } = Dimensions.get("window");

const ChatH1 = () => {
  const [chatComponents, setChatComponents] = useState([
    {
      id: Date.now(),
      username: "Mr.BOB",
      message: "Sample message",
      time: "12:51",
      url: "/chatroom/1",
    },
    {
      id: Date.now(),
      username: "Room 1",
      message: "Sample message",
      time: "12:51",
      url: "/chatroom/2",
    },
    {
      id: Date.now(),
      username: "Room 2",
      message: "Sample message",
      time: "12:51",
      url: "/chatroom/3",
    },
  ]);

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

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {chatComponents.map((chatComponent, ind) => (
          <View
            key={`${chatComponent.id}-${ind}`}
            style={styles.chatItemContainer}
          >
            <Componentchatuser
              username={chatComponent.username}
              message={chatComponent.message}
              time={chatComponent.time}
              url={chatComponent.url}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteChatComponent(chatComponent.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
