import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useGuildContext } from "../../context/GuildProvider";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import SourceCard from "../../components/E1_SourceCard";
import QuizCard from "../../components/F1_QuizCard";
import { guildDetail } from "../../services/GuildService";
const { width, height } = Dimensions.get("window");

const ChatScreen = () => {
  const { guild, setGuild } = useGuildContext();
  const { room } = useLocalSearchParams();
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

  const fetchGuild = async () => {
    const data = await guildDetail(room);
    console.log("Guild Data", data);
    setGuild(data);
  };

  useEffect(() => {
    joinRoom(room);
    fetchChat();
    fetchGuild();
    return () => {
      leaveRoom(room);
      clearMessage();
    };
  }, []);

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else if (user) {
      console.log("Hello Guild");
      setName(user.username || "");
    }
  }, [user, guild, isLogged]);

  const fetchChat = () => {
    setLoading(true);
    fetchMessage(room, offset);
    console.log(room, offset);
    setOffset(offset + 1);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (message.trim() && room) {
      const text = message;
      const time = new Date().toISOString();
      const type = "Text";
      const sender = name;
      sendMessage({ room, text, sender, type, time });
      console.log("Sended", { room, text, sender, type, time });
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color="#fca6cc" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{guild?.name}</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push("/guild/I3_GuildSetting")}
        >
          <Entypo name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.chatLog}>
        {user ? (
          <FlatList
            data={messages}
            renderItem={({ item, index }) => {
              if (item === null) {
                return null;
              }
              const isCurrentUser = item.sender === "";
              if (item.type === "Source") {
                const fav = user?.favorite_sources?.includes(item?.source._id)
                  ? true
                  : false;
                return (
                  <View>
                    <View
                      style={[
                        isCurrentUser
                          ? styles.receiverWrapper
                          : styles.userWrapper,
                      ]}
                    >
                      {!isCurrentUser && (
                        <Text style={styles.messageSender}>{item.sender}</Text>
                      )}
                    </View>
                    <SourceCard
                      id={item?.source._id}
                      title={item?.source.title}
                      author={item?.source.ownerId?.username}
                      tags={item?.source.tags}
                      rating={item?.source.avg_rating_score}
                      isFavorite={fav}
                    />
                    <View
                      style={[
                        styles.messageWrapper,
                        isCurrentUser
                          ? styles.receiverWrapper
                          : styles.userWrapper,
                      ]}
                    >
                      <Text style={styles.messageTime}>{item.time}</Text>
                    </View>
                  </View>
                );
              }
              if (item.type === "Quiz") {
                const fav = user?.favorite_quizzes?.includes(item?.quiz._id)
                  ? true
                  : false;
                return (
                  <View>
                    <View
                      style={[
                        isCurrentUser
                          ? styles.receiverWrapper
                          : styles.userWrapper,
                      ]}
                    >
                      {!isCurrentUser && (
                        <Text style={styles.messageSender}>{item.sender}</Text>
                      )}
                    </View>
                    <QuizCard
                      id={item?.quiz._id}
                      title={item?.quiz.title}
                      author={item?.quiz.ownerId?.username}
                      tags={item?.quiz.tags}
                      rating={item?.quiz.avg_rating_score}
                      isFavorite={fav}
                    />
                    <View
                      style={[
                        styles.messageWrapper,
                        isCurrentUser
                          ? styles.receiverWrapper
                          : styles.userWrapper,
                      ]}
                    >
                      <Text style={styles.messageTime}>{item.time}</Text>
                    </View>
                  </View>
                );
              }
              return (
                <View
                  style={[
                    styles.messageWrapper,
                    isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
                  ]}
                >
                  {!isCurrentUser && (
                    <Text style={styles.messageSender}>{item.sender}</Text>
                  )}
                  <View style={styles.messageBubble}>
                    <Text style={styles.messageText}>{item.text}</Text>
                  </View>
                  <View
                    style={[
                      styles.messageWrapper,
                      isCurrentUser
                        ? styles.receiverWrapper
                        : styles.userWrapper,
                    ]}
                  >
                    <Text Text style={styles.messageTime}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}`}
            inverted // This makes the list scroll from bottom to top
            onEndReached={fetchChat}
            onEndReachedThreshold={0.1} // Adjust as needed
            ListFooterComponent={loading && <ActivityIndicator />}
          />
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#fca6cc" />
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
    height: height * 0.1,
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fca6cc",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    right: width * 0.05,
    borderRadius: 20,
    padding: 5,
  },
  chatLog: {
    flex: 1,
    padding: 10,
  },
  senderWrapper: {
    marginVertical: 5,
    maxWidth: width * 0.7,
  },
  messageWrapper: {
    marginVertical: 5,
    maxWidth: width * 0.7,
  },
  userWrapper: {
    alignSelf: "flex-start",
  },
  receiverWrapper: {
    alignSelf: "flex-end",
  },
  messageSender: {
    fontSize: 12,
    color: "#666",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
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
