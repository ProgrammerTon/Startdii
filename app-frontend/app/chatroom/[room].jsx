import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import { fetchChat } from "../../services/ChatService";
import { findChatList } from "../../services/ChatListService";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import SourceCard from "../../components/E1_SourceCard";
import QuizCard from "../../components/F1_QuizCard";
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width, height } = Dimensions.get("window");
const ChatView = ({ message, index, name }) => {
  const isCurrentUser = message.sender === name;
  const formattedTime = message.time.endsWith(":")
    ? message.time.slice(0, -1)
    : message.time;
  return (
    <View
      style={[
        styles.messageWrapper,
        isCurrentUser ? styles.receiverWrapper : styles.userWrapper,
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.receiverMessage : styles.userMessage,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      <View
        style={[
          isCurrentUser ? styles.receiverMessage : styles.userMessage,
          { backgroundColor: "#fff" },
        ]}
      >
        <Text style={styles.messageTime}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const ChatRoom = () => {
  const { room } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userTitle, setUserTitle] = useState("");
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
  const [ischatend, setIschatend] = useState(false);

  useEffect(() => {
    if (!isLogged || !user) {
      router.replace("/sign-in");
    } else {
      console.log("Join Room", room);
      setName(user.username);
      joinRoom(room);
      fetchChat();
      fetchChatInfo();
    }
    return () => {
      leaveRoom(room);
      clearMessage();
    };
  }, []);

  const fetchChat = async () => {
    if (!ischatend && !loading) {
      setLoading(true);
      const data = await fetchMessage(room, offset);
      if (data.length === 0) {
        setIschatend(true);
      }
      setOffset(offset + 1);
      setLoading(false);
    }
  };

  const fetchChatInfo = async () => {
    setLoading(true);
    const data = await findChatList(room);
    setUserTitle(data.userId.username);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (message && room) {
      const time = new Date().toISOString();
      const type = "Text";
      const sender = name;
      const text = message;
      sendMessage({ room, text, sender, type, time });
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
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>{userTitle}</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() =>
            router.push({
              pathname: "/chatsystem/H3_user",
              params: { room: room, name: userTitle },
            })
          }
        >
          <Entypo name="menu" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.chatLog}>
        <FlatList
          data={messages}
          renderItem={({ item, index }) => {
            if (item === null) {
              return null;
            }

            // Handle "Source" type
            if (item.type === "Source") {
              const formattedTime = item.time.endsWith(":")
                ? item.time.slice(0, -1)
                : item.time;
              const fav = user?.favorite_sources?.includes(item?.source._id)
                ? true
                : false;
              const datenow = new Date();
              const createdAt = new Date(item?.source?.createdAt);
              const diffTime = Math.abs(datenow - createdAt);
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              const result = diffDays < 1 ? 1 : diffDays;
              return (
                <View style={{ marginBottom: 10 }}>
                  <SourceCard
                    id={item?.source._id}
                    title={item?.source.title}
                    author={item?.source.ownerId?.username}
                    tags={item?.source.tags}
                    rating={item?.source.avg_rating_score}
                    isFavorite={fav}
                    date={result}
                  />
                  <View
                    style={[
                      isCurrentUser
                        ? styles.receiverMessage
                        : styles.userMessage,
                      { backgroundColor: "#fff" },
                    ]}
                  >
                    <Text style={styles.messageTime}>{formattedTime}</Text>
                  </View>
                </View>
              );
            }

            // Handle "Quiz" type
            if (item.type === "Quiz") {
              const formattedTime = item.time.endsWith(":")
                ? item.time.slice(0, -1)
                : item.time;
              const fav = user?.favorite_quizzes?.includes(item?.quiz._id)
                ? true
                : false;
              const datenow = new Date();
              const createdAt = new Date(item?.quiz?.createdAt);
              const diffTime = Math.abs(datenow - createdAt);
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              const result = diffDays < 1 ? 1 : diffDays;
              return (
                <View style={{ marginBottom: 10 }}>
                  <QuizCard
                    id={item?.quiz._id}
                    title={item?.quiz.title}
                    author={item?.quiz.ownerId?.username}
                    tags={item?.quiz.tags}
                    rating={item?.quiz.avg_rating_score}
                    isFavorite={fav}
                    date={result}
                  />
                  <View
                    style={[
                      isCurrentUser
                        ? styles.receiverMessage
                        : styles.userMessage,
                      { backgroundColor: "#fff" },
                    ]}
                  >
                    <Text style={styles.messageTime}>{formattedTime}</Text>
                  </View>
                </View>
              );
            }

            // Default case for regular chat messages
            const isCurrentUser = item.sender === name;
            return <ChatView index={index} message={item} name={name} />;
          }}
          keyExtractor={(item, index) => `${item?.sender}-${index}`}
          inverted // This makes the list scroll from bottom to top
          onEndReached={fetchChat}
          onEndReachedThreshold={0.1} // Adjust as needed
          ListFooterComponent={loading && <ActivityIndicator />}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  chatLog: {
    flex: 1,
    paddingHorizontal: 10,
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
  messageContainer: {
    padding: 10,
    borderRadius: 10,
  },
  timeContainer: {
    backgroundColor: colors.white,
  },
  userMessage: {
    backgroundColor: colors.gray_bg,
    alignSelf: "flex-start",
  },
  receiverMessage: {
    backgroundColor: "#e1ffc7",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: colors.gray_font,
    alignSelf: "flex-end",
  },
  inputContainer: {
    height: height * 0.08,
    backgroundColor: colors.blue,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 3,
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    color: colors.white,
  },
  menuButton: {
    position: "absolute",
    right: width * 0.05,
    borderRadius: 20,
    padding: 5,
  },
});

{
  /* <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === name
                ? styles.receiverMessage
                : styles.userMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        ))}
      </ScrollView> */
}
