import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

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
          <Text style={[fonts.EngBold16, styles.username]}>{item.username}</Text>
          <Text style={[fonts.EngMedium14, styles.message]}>{item.lastMessage}</Text>
        </View>
        <Text style={[fonts.EngRegular12, styles.time]}>{timeString}</Text>
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
    backgroundColor: colors.gray_bg,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flex: 1, // Takes up available space
  },
  username: {
    color: colors.black,
  },
  message: {
    color: colors.gray_font,
    marginTop: 2,
  },
  time: {
    color: colors.gray_font,
    bottom: 10,
  },
});

export default Componentchatuser;
