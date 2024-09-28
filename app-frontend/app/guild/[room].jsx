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
import SourceCard from "../../components/E1_SourceCard";
import QuizCard from "../../components/F1_QuizCard";
const { width, height } = Dimensions.get("window");

const ChatScreen = () => {
  const [guildName, setGuildName] = useState("");
  const { guild } = useGuildContext();
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

  useEffect(() => {
    joinRoom(room);
    fetchChat();
    return () => {
      leaveRoom(room);
      clearMessage();
    };
  }, []);

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else if (user && guild) {
      setName(user.username || "");
      setGuildName(guild.name || "Test_guild");
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
      const time = new Date().toLocaleTimeString().slice(0, 5);
      const type = "Text";
      const sender = name;
      const userName = user.username;
      sendMessage({ room, text, sender, type, time });
      setMessage("");
    }
  };
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
      <View style={styles.chatLog}>
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
                  <View
                    style={[
                      styles.messageWrapper,
                      item.isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
                    ]}
                  >
                    {!item.isCurrentUser && (
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
                    item.isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
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
                      styles.messageWrapper,
                      item.isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
                    ]}
                  >
                    {!item.isCurrentUser && (
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
                    item.isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
                  ]}
                  >
                    <Text style={styles.messageTime}>{item.time}</Text>
                  </View>
                </View>
              );
            }
            item.isCurrentUser = item.sender == user.username;
            return (
              <View
                style={[
                  styles.messageWrapper,
                  item.isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
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
      </View>

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
  chatLog: {
    flex: 1,
    padding: 10,
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