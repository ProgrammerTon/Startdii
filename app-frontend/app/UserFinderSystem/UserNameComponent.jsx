import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const UserNameComponent = ({ id, username, onPress }) => {
  return (
    <View key={id} style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPress(id)}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserNameComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  username: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    lineHeight: 40,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
