import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { logoutUser } from "../utils/asyncstroage";

const LogoutButton = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsLogged(false);
      console.log("User Logout");
    } catch (error) {
      Alert.alert(error.messsage);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleLogout()}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({});
