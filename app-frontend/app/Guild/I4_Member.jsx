import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import MemberItem from "./MemberItem"; // Import the new component
import { useGuildContext } from "../../context/GuildProvider";
import { kickViceLeader, promoteViceLeader } from "../../services/GuildService";
import { useGlobalContext } from "../../context/GlobalProvider";

const MemberScreen = () => {
  // const members = [
  //   { id: 1, name: "Juaz Juazzz", isAdmin: true, isViceAdmin: false },
  //   { id: 2, name: "PunInwZa007", isAdmin: false, isViceAdmin: true },
  //   { id: 3, name: "Mr.BOB", isAdmin: false, isViceAdmin: true },
  //   { id: 4, name: "rainny", isAdmin: false, isViceAdmin: false },
  //   { id: 5, name: "fortune", isAdmin: false, isViceAdmin: false },
  // ];
  const [members, setMembers] = useState([]);
  const { guild, loadGuild } = useGuildContext();
  const { user } = useGlobalContext();
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
    const owner = members.find((user) => user._id === user._id);
    const userpro = members.find((user) => user._id === userId);
    if (!owner.isAdmin) {
      Alert.alert("You Not have Permission");
      return;
    }
    if (userpro.isAdmin) {
      Alert.alert("You Cant Promote Admin");
      return;
    }
    const data = await promoteViceLeader(guild._id, userId, "add");
    console.log(data);
    if (!data) {
      Alert.alert("Promote Failed");
      return;
    } else {
      Alert.alert("Promote!");
    }
    await loadGuild();
  };

  const kickMember = async (userId) => {
    if (userId === user._id) {
      Alert.alert("You Cant Kick Yourself");
      return;
    }
    const owner = members.find((user) => user._id === user._id);
    const userkick = members.find((user) => user._id === userId);
    if (!owner.isAdmin && !owner.isViceAdmin) {
      Alert.alert("You Not have Permission");
      return;
    }
    if (owner.isViceAdmin && userkick.isViceAdmin) {
      Alert.alert("You Not have Permission");
      return;
    }
    if (userkick.isAdmin) {
      Alert.alert("You Cant Kick Admin");
      return;
    }
    let data;
    if (userkick.isViceAdmin) {
      data = await kickViceLeader(guild._id, userId);
    }
    if (!userkick.isAdmin && !userkick.isViceAdmin) {
      data = await kickMember(guild._id, userId);
    }
    console.log(data);
    if (!data) {
      Alert.alert("Kick Failed");
      return;
    } else {
      Alert.alert("Kick!!");
    }
    await loadGuild();
  };

  return (
    <View style={styles.container}>
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
              mainKick={kickMember}
              mainPromote={promoteMember}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </View>
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
