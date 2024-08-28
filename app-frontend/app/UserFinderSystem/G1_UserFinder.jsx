import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import UserNameComponent from "./UserNameComponent";
import { getUserByUsername } from "../../services/UserService";

const UserFinderPage = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const [userFound, setUserFound] = useState([]);

  const onSubmit = async () => {
    const user = await getUserByUsername(searchUsername);
    if (!user) {
      Alert.alert("Not Found User");
    } else {
      setUserFound([user]);
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
        return <UserNameComponent id={user._id} username={user.username} />;
      })}
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
