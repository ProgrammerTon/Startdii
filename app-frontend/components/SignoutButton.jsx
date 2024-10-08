import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import fonts from "../constants/font";
import colors from "../constants/color";
import SignoutIcon from "../components/SignoutIcon";
import SignUp from "../app/(auth)/sign-in";
import { useGlobalContext } from "../context/GlobalProvider";
import { logoutUser } from "../utils/asyncstroage";
import { router } from "expo-router";
import RecheckBox from "./RecheckBox";

const SignoutButton = ({ onPress, style, navigation }) => {
  const { setUser, setIsLogged } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsLogged(false);
      console.log("User Logout");
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert(error.messsage);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={openModal}>
        <SignoutIcon />
      </TouchableOpacity>

      <RecheckBox
        visible={modalVisible}
        onClose={closeModal}
        onYesPress={handleLogout}
        title="Do you want to Sign out ?"
        yes="Sign out"
        no="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 45,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SignoutButton;
