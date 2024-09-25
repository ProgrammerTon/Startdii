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
import Ionicons from '@expo/vector-icons/Ionicons';
import SourceCard from "../../components/E1_SourceCard";
import QuizCard from "../../components/F1_QuizCard";
const { width, height } = Dimensions.get("window");
const ChatView = ({ message, index, name }) => {
  const isCurrentUser = message.sender === name;
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
          isCurrentUser
            ? styles.receiverMessage
            : styles.userMessage,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      <View style={{backgroundColor: "#fff"}}>
        <Text style={styles.messageTime}>{message.time.slice(0, -1)}</Text>
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

  useEffect(() => {
    if (!isLogged || !user) {
      router.replace("/sign-in");
    } else {
      setName(user.username);
    }
    console.log("Join Room", room);
    joinRoom(room);
    fetchChat();
    fetchChatInfo();
    return () => {
      leaveRoom(room);
      clearMessage();
    };
  }, []);

  const fetchChat = () => {
    setLoading(true);
    fetchMessage(room, offset);
    setOffset(offset + 1);
    setLoading(false);
  };

  const fetchChatInfo = async () => {
    setLoading(true);
    const data = await findChatList(room);
    setUserTitle(data.userId.username);
    setLoading(false);
  };

  const handleSendMessage = () => {
    if (message && room) {
      const time = new Date().toLocaleTimeString().slice(0, 5);
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
          onPress={() =>  router.back()}
        >
          <Entypo name="chevron-left" size={30} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userTitle}</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push("/chatsystem/H3_user")}
        >
          <Entypo name="menu" size={30} color="white" />
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
              const fav = user?.favorite_sources?.includes(item?.source._id)
                ? true
                : false;
              return (
                <View style={{marginBottom:10}}>
                  <SourceCard
                    id={item?.source._id}
                    title={item?.source.title}
                    author={item?.source.ownerId?.username}
                    tags={item?.source.tags}
                    rating={item?.source.avg_rating_score}
                    isFavorite={fav}
                  />
                </View>
              );
            }

            // Handle "Quiz" type
            if (item.type === "Quiz") {
              const fav = user?.favorite_quizzes?.includes(item?.quiz._id)
                ? true
                : false;
              return (
                <View style={{marginBottom:10}}>
                  <QuizCard
                    id={item?.quiz._id}
                    title={item?.quiz.title}
                    author={item?.quiz.ownerId?.username}
                    tags={item?.quiz.tags}
                    rating={item?.quiz.avg_rating_score}
                    isFavorite={fav}
                  />
                  <View style={{backgroundColor: "#fff"}}>
                    <Text style={styles.messageTime}>{item.time}</Text>
                  </View>
                </View>
              );
            }

            // Default case for regular chat messages
            const isCurrentUser = item.sender === name;
            return (
              <ChatView index={index} message={item} name={name} />
            );
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
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
  },
  userMessage: {
    backgroundColor: "#f0f0f0",
  },
  receiverMessage: {
    backgroundColor: "#e1ffc7",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#555",
    alignSelf: "flex-end",
  },
  inputContainer: {
    height: height * 0.08,
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 3,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
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
