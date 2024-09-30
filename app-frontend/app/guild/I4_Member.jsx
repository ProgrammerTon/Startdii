import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import MemberItem from "./MemberItem"; // Import the new component
import { useGuildContext } from "../../context/GuildProvider";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  kickMember,
  kickPerson,
  kickViceLeader,
  promoteAdmin,
  promoteViceLeader,
  guildDetail,
} from "../../services/GuildService";

const MemberScreen = () => {
  // const members = [
  //   { id: 1, name: "Juaz Juazzz", isAdmin: true, isViceAdmin: false },
  //   { id: 2, name: "PunInwZa007", isAdmin: false, isViceAdmin: true },
  //   { id: 3, name: "Mr.BOB", isAdmin: false, isViceAdmin: true },
  //   { id: 4, name: "rainny", isAdmin: false, isViceAdmin: false },
  //   { id: 5, name: "fortune", isAdmin: false, isViceAdmin: false },
  // ];
  const [members, setMembers] = useState([]);
  const { guild, loadGuild, setGuild } = useGuildContext();
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const transformdata = guild.memberIdList.map((item, index) => ({
      _id: item._id,
      id: index + 1, // Assign a sequential ID starting from 1
      username: `${item.username}`, // Combine firstname and lastname
      isAdmin: item.role === "leader", // Check if the role is 'admin'
      isViceAdmin: item.role === "vice-leader", // Check if the role is 'vice-admin'
    }));

    setMembers(transformdata);
  }, []);

  const promoteMember = async (userId) => {
    if (userId === user._id) {
      Alert.alert("You Cant Promote Yourself");
      return;
    }
    const owner = members.find((userw) => userw._id === user._id);
    const userpro = members.find((userw) => userw._id === userId);
    if (!owner.isAdmin) {
      Alert.alert("You Not have Permission");
      return;
    }
    if (userpro.isAdmin) {
      Alert.alert("You Cant Promote Admin");
      return;
    }
    if (userpro.isViceAdmin) {
      console.log("test");
      const data = await promoteAdmin(guild._id, userId, "add");
      if (!data) {
        Alert.alert("Promote Failed");
        return;
      } else {
        Alert.alert("Promote!");
      }
    } else {
      const data = await promoteViceLeader(guild._id, userId, "add");
      if (!data) {
        Alert.alert("Promote Failed");
        return;
      } else {
        Alert.alert("Promote!");
      }
    }
    await loadGuild();
  };

  const fetchGuild = async () => {
    const data = await guildDetail(guild._id);
    console.log("Guild Data", data);
    setGuild(data);
  };

  const handleKickMember = async (userId) => {
    if (userId === user._id) {
      Alert.alert("You Cant Kick Yourself");
      return;
    }
    const owner = members.find((userw) => userw._id === user._id);
    const userkick = members.find((userw) => userw._id === userId);
    if (userkick.isAdmin) {
      Alert.alert("You Cant Kick Admin");
      return;
    }
    if (userkick.isViceAdmin && owner.isViceAdmin) {
      Alert.alert("You Cant Kick Same Role");
      return;
    }
    if (!owner.isAdmin && !owner.isViceAdmin) {
      Alert.alert("You Dont have Permission");
      return;
    }
    let data;
    if (owner.isAdmin && userkick.isViceAdmin) {
      data = kickViceLeader(guild._id, userId);
    }
    if (owner.isViceAdmin) {
      data = kickMember(guild._id, userId);
    }
    if (data) {
      Alert.alert("Kicked!!");
      await loadGuild();
      return;
    } else {
      Alert.alert("Kicked Failed");
      return;
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchGuild} />
      }
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>MEMBER</Text>
      </View>
      <View style={styles.memberContainer}>
        <FlatList
          data={members}
          renderItem={({ item, index }) => (
            <MemberItem
              userId={item._id}
              key={item.id}
              name={item.username}
              isAdmin={item.isAdmin}
              isViceAdmin={item.isViceAdmin}
              mainKick={handleKickMember}
              mainPromote={promoteMember}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fca6cc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 24,
    color: "#000",
  },
  headerText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginLeft: 20,
  },
  memberContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
