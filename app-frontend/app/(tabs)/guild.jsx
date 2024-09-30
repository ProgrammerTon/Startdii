// GuildPage.js
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import GuildButton from "../guild/GuildButton";
import { Redirect, router, useFocusEffect } from "expo-router";
import CreateJoinGuild from "../guild/GuildCreateOrJoin";
import { guildList } from "../../services/GuildService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useGuildContext } from "../../context/GuildProvider";
import SafeAreaViewAndroid from "../../components/SafeAreaViewAndroid";
import fonts from "../../constants/font";
import colors from "../../constants/color";

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
      cover: guild.cover,
      title: guild.name,
      description: guild.description + ".",
      members: guild.memberIdList.length,
    }));
    setRefreshing(false);
    setGuilds(formattedGuilds);
  };

  const [guildCreateJoinWindow, setguildCreateJoinWindow] = useState(false);

  const openguildCreateJoinWindow = () => {
    setguildCreateJoinWindow(true);
  };

  const closeguildCreateJoinWindow = () => {
    setguildCreateJoinWindow(false);
  };

  return (
    <SafeAreaViewAndroid style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Guild</Text>
      </View>
      <TouchableHighlight
        onPress={() => router.push("/dev")}
        className="bg-green-600 p-2 rounded-xl"
      >
        <Text className="text-lg">Dev</Text>
      </TouchableHighlight>
      <View style={styles.guildContainer}>
        <FlatList
          data={guilds}
          renderItem={({ item, index }) => {
            return (
              <GuildButton
                key={item.id}
                guild={item}
                onPress={() => {
                  setGuildId(item.id);
                  router.push(`/guild/${item.id}`);
                }}
              />
            );
          }}
          keyExtractor={(item) => `${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadGuildsData}
            />
          }
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={openguildCreateJoinWindow}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <CreateJoinGuild
        visible={guildCreateJoinWindow}
        onClose={closeguildCreateJoinWindow}
        loadData={loadGuildsData}
      />
    </SafeAreaViewAndroid>
  );
};

export default GuildPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_bg,
    paddingTop: 35,
  },
  guildContainer: {
    padding: 20,
  },
  header: {
    backgroundColor: colors.pink,
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },
  floatingButton: {
    backgroundColor: colors.red,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 125,
    right: 30,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
