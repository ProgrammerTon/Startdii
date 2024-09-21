import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity,Dimensions } from 'react-native';
import { Redirect, router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import Entypo from "@expo/vector-icons/Entypo";
import Menu from "./FriendGuildMenu";
const { width, height } = Dimensions.get('window');

export default function SharePage() {
  const [activeMenu, setActiveMenu] = useState("Friends");

  const menuData = [
    { name: 'Friends' } , { name: 'Guilds' }
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case "Friends":
        return <Friends />;
      case "Guilds":
        return <Guilds />;
      default:
        return <Friends />;
    }
  };

  const menuItems = [
    { id: "1", name: "Friends" },
    { id: "2", name: "Guilds" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeQuiz}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color="blue" />
        </TouchableOpacity>
        <Text style={styles.title}>Share with</Text>
      </View>
      <View style={styles.selection}>
        <Menu menuData={menuData} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: height * 0.1,
    width: width,
    backgroundColor: "#20AAFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeQuiz: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  selection: {
    marginVertical: 20,
    width: width*0.7,
    alignSelf: "center",
  },
  selectionText: {
    textAlign: "center",
  },
});
