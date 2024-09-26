import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useGuildContext } from "../../context/GuildProvider";
import QuizCard from "../../components/F1_QuizCard";
import SourceCard from "../../components/E1_SourceCard";

const ChatScreen = () => {
  const [guildName, setGuildName] = useState("");
  const { guild } = useGuildContext();
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    joinRoom,
    leaveRoom,
    messages,
    sendMessage,
    fetchMessage,
    user,
    isLogged,
    clearMessage,
  } = useGlobalContext();

  useEffect(() => {
    if (room) {
      joinRoom(room);
      fetchChat();
      return () => {
        leaveRoom(room);
        clearMessage();
      };
    }
  }, [room]);

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else if (user && guild) {
      setName(user.username || "");
      setGuildName(guild.name || "Test_guild");
      setRoom(guild._id || "");
    }
  }, [user, guild, isLogged]);

  const fetchChat = () => {
    setLoading(true);
    fetchMessage(room, offset);
    setOffset(offset + 1);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (message.trim() && room) {
      const text = message;
      const time = new Date().toLocaleTimeString().slice(0, 5);
      const type = "Text";
      const sender = name;
      const userName = user.username;
      sendMessage({ room, text, sender, type, time });
      setMessage("");
    }
  };

  useEffect(() => {
    setOffset(1);
    clearMessage();
  }, []);
  // const [messages, setMessages] = useState([
  //   {
  //     id: 1,
  //     text: "สวัสดีครับท่านสมาชิกชมรม",
  //     time: "12:48",
  //     sender: "Juaz Juazzz",
  //     isCurrentUser: false,
  //   },
  //   {
  //     id: 2,
  //     text: "สวัสดีครับท่านประธาน",
  //     time: "12:48",
  //     sender: "Me",
  //     isCurrentUser: true,
  //   },
  //   {
  //     id: 3,
  //     text: "รู้เขารู้เรา",
  //     time: "12:49",
  //     sender: "Mr.BOB",
  //     isCurrentUser: false,
  //   },
  //   {
  //     id: 4,
  //     text: "รบร้อยครั้ง",
  //     time: "12:50",
  //     sender: "PunInwZa007",
  //     isCurrentUser: false,
  //   },
  //   {
  //     id: 5,
  //     text: "แพ้ร้อยครั้ง",
  //     time: "12:51",
  //     sender: "Me",
  //     isCurrentUser: true,
  //   },
  // ]);

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
      {user && room ? (
        <FlatList
        data={messages}
        renderItem={({ item, index }) => {
          item.isCurrentUser = item.sender === user.username;
      
          if (item.type === "Shared Component" && item.componentData) {
            const { componentProps, type } = item.componentData;
      
            return (
              <View key={index} style={styles.sharedComponentWrapper}>
                {/* Row for time and sender */}
                <View style={styles.timeSenderRow}>
                  <Text style={styles.messageTime}>{item.time}</Text>
                  {!item.isCurrentUser && (
                    <Text style={styles.messageSender}>{item.sender}</Text>
                  )}
                </View>
      
                {/* Shared component (either source or quiz) */}
                <View>
                  {type === "source" ? (
                    <SourceCard {...componentProps} />
                  ) : (
                    <QuizCard {...componentProps} />
                  )}
                </View>
              </View>
            );
          }
      
          // Existing code for regular text messages
          return (
            <View
              key={item.id}
              style={[
                styles.messageWrapper,
                item.isCurrentUser ? styles.currentUser : styles.otherUser,
              ]}
            >
              {/* Row for time and sender */}
              <View style={styles.timeSenderRow}>
                <Text style={styles.messageTime}>{item.time}</Text>
                {!item.isCurrentUser && (
                  <Text style={styles.messageSender}>{item.sender}</Text>
                )}
              </View>
      
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => `${item.sender}-${index}`}
        inverted
        onEndReached={fetchChat}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      
      
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
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
    marginLeft: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageTime: {
    fontSize: 10,
    color: "#aaa",
    marginRight: 5,
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
  sharedComponentWrapper: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  timeSenderRow: {
    flexDirection: 'row', // Align time and sender in a row
    alignItems: 'center', // Vertically center items
  },
});
