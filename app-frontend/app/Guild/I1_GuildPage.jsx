// GuildPage.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import GuildButton from "./GuildButton";
import { Redirect, router } from "expo-router";
import CreateJoinGuild from "./GuildCreateOrJoin";
import { guildList } from "../../services/GuildService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useGuildContext } from "../../context/GuildProvider";

const GuildPage = () => {
  const [guilds, setGuilds] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const { isLogged } = useGlobalContext();
  const { setGuildId } = useGuildContext();

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    } else {
      loadGuildsData();
      setRefreshing(false);
    }
  }, []);

  const loadGuildsData = async () => {
    const guilds = await guildList();
    const formattedGuilds = guilds.map((guild) => ({
      id: guild._id,
      color: "#FF6347",
      badgeColor: "#2ecc71",
      title: guild.name,
      description: guild.description + ".",
      members: guild.memberIdList.length,
    }));
    setRefreshing(false);
    setGuilds(formattedGuilds);
  };
  // [
  //   {
  //     id: 1,
  //     color: "#FF6347",
  //     badgeColor: "#2ecc71",
  //     title: "เรารู้เขารู้เรา",
  //     description: "เรารู้เขา เรารู้ว่าคนชื่นชอบ...",
  //     members: 12,
  //   },
  //   {
  //     id: 2,
  //     color: "#4682B4",
  //     badgeColor: "#FF69B4",
  //     title: "แต่เขาแกล้งรู้เรา",
  //     description: "เรารู้เขา เรารู้ว่าคนชื่นชอบ...",
  //     members: 12,
  //   },
  //   {
  //     id: 3,
  //     color: "#FFB6C1",
  //     badgeColor: "#FF4500",
  //     title: "อะไรอ่ะ",
  //     description: "เรารู้เขา เรารู้ว่าคนชื่นชอบ...",
  //     members: 12,
  //   },
  // ];

  const [guildCreateJoinWindow, setguildCreateJoinWindow] = useState(false);

  const openguildCreateJoinWindow = () => {
    setguildCreateJoinWindow(true);
  };

  const closeguildCreateJoinWindow = () => {
    setguildCreateJoinWindow(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Guild</Text>
      </View>
      <FlatList
        data={guilds}
        renderItem={({ item, index }) => (
          <GuildButton
            key={item.id}
            guild={item}
            onPress={() => {
              setGuildId(item.id);
              router.push("/guild/I2_ChatScreen");
            }}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadGuildsData} />
        }
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={openguildCreateJoinWindow}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <CreateJoinGuild
        visible={guildCreateJoinWindow}
        onClose={closeguildCreateJoinWindow}
      />
    </View>
  );
};

export default GuildPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  header: {
    backgroundColor: "#FFB6C1",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  floatingButton: {
    backgroundColor: "#FF6347",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
