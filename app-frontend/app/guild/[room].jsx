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
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useGuildContext } from "../../context/GuildProvider";
import SourceCard from "../../components/E1_SourceCard";
import QuizCard from "../../components/F1_QuizCard";
import { guildDetail } from "../../services/GuildService";

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
        <TouchableOpacity>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{guild?.name}</Text>
        <TouchableOpacity onPress={() => router.push("/guild/I3_GuildSetting")}>
          <Text style={styles.menuButton}>≡</Text>
        </TouchableOpacity>
      </View>
      {user ? (
        <FlatList
          data={messages}
          renderItem={({ item, index }) => {
            if (item === null) {
              return null;
            }
            if (item.type === "Source") {
              const fav = user?.favorite_sources?.includes(item?.source._id)
                ? true
                : false;
              return (
                <View>
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
                      item.isCurrentUser
                        ? styles.currentUser
                        : styles.otherUser,
                    ]}
                  >
                    {!item.isCurrentUser && (
                      <Text style={styles.messageSender}>{item.sender}</Text>
                    )}
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
                      item.isCurrentUser
                        ? styles.currentUser
                        : styles.otherUser,
                    ]}
                  >
                    {!item.isCurrentUser && (
                      <Text style={styles.messageSender}>{item.sender}</Text>
                    )}
                    <Text style={styles.messageTime}>{item.time}</Text>
                  </View>
                </View>
              );
            }
            item.isCurrentUser = item.sender == user.username;
            return (
              <View
                key={item.id}
                style={[
                  styles.messageWrapper,
                  item.isCurrentUser ? styles.currentUser : styles.otherUser,
                ]}
              >
                {!item.isCurrentUser && (
                  <Text style={styles.messageSender}>{item.sender}</Text>
                )}
                <View style={styles.messageBubble}>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
                <Text style={styles.messageTime}>{item.time}</Text>
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
