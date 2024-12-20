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
  ScrollView,
} from "react-native";
import UserSearchBar from "../../components/UserSearchBar";
import UserNameComponent from "../UserFinderSystem/UserNameComponent";
import { getUserByUsername } from "../../services/UserService";
import { addChatList } from "../../services/ChatListService";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import SafeAreaViewAndroid from "../../components/SafeAreaViewAndroid";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const UserFinderPage = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [userFound, setUserFound] = useState([]);
  const { user, isLogged } = useGlobalContext();

  useEffect(() => {
    if (!user || !isLogged) {
      router.replace("/sign-in");
    }
  }, []);

  const onSubmit = async () => {
    if (searchUsername.trim() === "") {
      return null;
    }
    const user = await getUserByUsername(searchUsername);
    if (!user) {
      Alert.alert("Not Found User");
    } else {
      // console.log("Found Users", user);
      setUserFound([...user]);
    }
  };

  const onAdd = async (userId) => {
    try {
      const result = await addChatList(user._id, userId);
      if (!result) {
        throw Error("Cant Add Same User to Chat");
      }
    } catch (error) {
      Alert.alert("Error adding chat:", error.message);
    }
  };

  return (
    <SafeAreaViewAndroid style={styles.container}>
      <UserSearchBar
        value={searchUsername}
        handleChangeText={(e) => setSearchUsername(e)}
        onSubmit={onSubmit}
      />

      <ScrollView>
        {userFound.map((user, ind) => {
          return (
            <UserNameComponent
              key={user._id}
              id={user._id}
              username={user.username}
              onPress={onAdd}
            />
          );
        })}
      </ScrollView>
    </SafeAreaViewAndroid>
  );
};
export default UserFinderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_bg,
    padding: 20,
    paddingTop: 30,
  },
});
