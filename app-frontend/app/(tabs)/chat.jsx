import React, { useState, useEffect, useCallback } from "react";
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
import Componentchatuser from "../chatsystem/Componentchatuser";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getChatList } from "../../services/ChatListService";
import SafeAreaViewAndroid from "../../components/SafeAreaViewAndroid";
import colors from "../../constants/color";
import fonts from "../../constants/font";
// Get screen width for responsive design
const { width, height } = Dimensions.get("window");

const ChatH1 = () => {
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, isLogged } = useGlobalContext();

  useFocusEffect(
    useCallback(() => {
      if (!isLogged) {
        router.replace("/sign-in");
      } else {
        setRefreshing(true);
        loadUserData();
        setRefreshing(false);
      }
    }, [])
  );

  const loadUserData = async () => {
    setRefreshing(true);
    const chatList = await getChatList();
    const filteredData = chatList.map((chat) => ({
      username: chat.userId.username,
      url: `/chatroom/${chat.chatroom}`,
      lastMessage: chat?.lastMessage?.message
        ? chat.lastMessage.message
        : "sample message",
      msgTime: chat?.lastMessage?.createdAt
        ? chat.lastMessage.createdAt
        : new Date().toISOString(),
    }));
    setRefreshing(false);
    setUserData(filteredData);
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
    <SafeAreaViewAndroid style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[fonts.EngBold22, styles.header]}>Chat</Text>
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
    </SafeAreaViewAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_bg,
  },
  headerContainer: {
    backgroundColor: colors.blue,
    textAlign: "center",
    height: "9.625%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
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
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 125,
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
