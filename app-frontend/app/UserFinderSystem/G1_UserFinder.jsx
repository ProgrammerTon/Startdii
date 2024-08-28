import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import UserNameComponent from "./UserNameComponent";
import { getUserByUsername } from "../../services/UserService";
import { getChatList, addChatList } from "../../services/ChatListService";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#C8C8C8",
      }}
    />
  );
};

const ItemView = ({ item }) => {
  return (
    <TouchableOpacity
      className="bg-blue-700 h-16 rounded-2xl flex justify-center items-center"
      onPress={() => router.push(`/chatroom/${item.chatroom}`)}
    >
      <Text>{item.username}</Text>
    </TouchableOpacity>
  );
};

const UserFinderPage = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [userFound, setUserFound] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [userData, setUserData] = useState([]);
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!user || !isLogged) {
      router.replace("/sign-in");
    } else {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    const chatList = await getChatList();
    const filteredData = chatList.map((chat) => ({
      username: chat.userId.username,
      chatroom: chat.chatroom,
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

  const onSubmit = async () => {
    const user = await getUserByUsername(searchUsername);
    if (!user) {
      Alert.alert("Not Found User");
    } else {
      setUserFound([user]);
    }
  };

  const onAdd = async (userId) => {
    try {
      const result = await addChatList(user._id, userId);
      if (!result) {
        throw Error("Cant Add User to Chat");
      }
    } catch (error) {
      Alert.alert("Error adding chat:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchUsername}
        handleChangeText={(e) => setSearchUsername(e)}
        onSubmit={onSubmit}
      />
      {userFound.map((user) => {
        return (
          <UserNameComponent
            id={user._id}
            username={user.username}
            onPress={onAdd}
          />
        );
      })}
      <Text>Added Chat</Text>
      <FlatList
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
      />
    </View>
  );
};
export default UserFinderPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
});
