import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const ChatSearch = () => {
  const { room, name } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>  router.back()}
        >
          <Entypo name="chevron-left" size={30} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="green"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in conversation"
        />
      </View>

      {/* Note Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/chatsystem/H4_NoteUser",
            params: { room: room },
          })
        }
      >
        <Text style={styles.buttonText}>Note</Text>
      </TouchableOpacity>

      {/* Quiz Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/chatsystem/H5_QuizUser",
            params: { room: room },
          })
        }
      >
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    flexDirection: 'column',
    alignSelf: "center",
    alignItems: 'center',
    height: height * 0.1,
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
