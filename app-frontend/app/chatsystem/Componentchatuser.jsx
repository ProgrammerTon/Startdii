import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// Get screen width for responsive design
const { width } = Dimensions.get("window");

const Componentchatuser = ({ item }) => {
  let timeString = "Invalid time";

  try {
    const newDate = new Date(item.msgTime);
    if (!isNaN(newDate)) {
      const hours = String(newDate.getHours()).padStart(2, "0");
      const minutes = String(newDate.getMinutes()).padStart(2, "0");
      timeString = `${hours}:${minutes}`;
    }
  } catch (error) {
    console.error("Error parsing date:", error);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => {
          router.push(item.url);
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.message}>{item.lastMessage}</Text>
        </View>
        <Text style={styles.time}>{timeString}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40, // Responsive width with padding
    alignSelf: "center",
    marginVertical: 5, // Space between components
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1, // Takes up available space
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});

export default Componentchatuser;
