import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Redirect, router } from "expo-router";

const ChatScreen = () => {
  const guildName = "Test_guild";
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "สวัสดีครับท่านสมาชิกชมรม",
      time: "12:48",
      sender: "Juaz Juazzz",
      isCurrentUser: false,
    },
    {
      id: 2,
      text: "สวัสดีครับท่านประธาน",
      time: "12:48",
      sender: "Me",
      isCurrentUser: true,
    },
    {
      id: 3,
      text: "รู้เขารู้เรา",
      time: "12:49",
      sender: "Mr.BOB",
      isCurrentUser: false,
    },
    {
      id: 4,
      text: "รบร้อยครั้ง",
      time: "12:50",
      sender: "PunInwZa007",
      isCurrentUser: false,
    },
    {
      id: 5,
      text: "แพ้ร้อยครั้ง",
      time: "12:51",
      sender: "Me",
      isCurrentUser: true,
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        time: new Date().toLocaleTimeString().slice(0, 5),
        sender: "Me",
        isCurrentUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{guildName}</Text>
        <TouchableOpacity onPress={() => router.push("/guild/I3_GuildSetting")}>
          <Text style={styles.menuButton}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isCurrentUser ? styles.currentUser : styles.otherUser,
            ]}
          >
            {!message.isCurrentUser && (
              <Text style={styles.messageSender}>{message.sender}</Text>
            )}
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "#fca6cc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    fontSize: 24,
    color: "#000",
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  menuButton: {
    fontSize: 24,
    color: "#000",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageWrapper: {
    marginBottom: 10,
  },
  messageSender: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  messageBubble: {
    borderRadius: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxWidth: "80%",
    backgroundColor: "white",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageTime: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 2,
    alignSelf: "flex-end",
  },
  currentUser: {
    alignSelf: "flex-end",
  },
  otherUser: {
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fca6cc",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 18,
    color: "#fca6cc",
  },
});
