import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const UserNameComponent = ({ id, username, onPress }) => {
  return (
    <TouchableOpacity
      key={id}
      style={styles.container}
      onPress={() => router.push(`profile/${id}`)}
    >
      <Text style={[fonts.EngSemiBold16, styles.username]}>{username}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPress(id)}>
        <Text style={[fonts.EngBold14, styles.buttonText]}>Add User</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default UserNameComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: colors.gray_button,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  username: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    lineHeight: 40,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
  },
});
