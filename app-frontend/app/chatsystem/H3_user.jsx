import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width, height } = Dimensions.get("window");

const ChatSearch = () => {
  const { room, name } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>{name}</Text>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchBarContainer}>
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
      </View> */}

      {/* Note Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/chatsystem/H4_NoteUser",
              params: { room: room },
            })
          }
        >
          <Text style={[fonts.EngBold22, styles.buttonText]}>Note</Text>
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
          <Text style={[fonts.EngBold22, styles.buttonText]}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_bg,
  },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    color: colors.white,
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
    color: colors.black,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    width: width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 25,
    marginVertical: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.black,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

