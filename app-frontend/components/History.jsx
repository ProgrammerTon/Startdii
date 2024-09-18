import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SourceCard from "../components/E1_SourceCard.jsx";
import QuizCard from "../components/F1_QuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { getSource } from "../services/SourceService";
import { useGlobalContext } from "../context/GlobalProvider.js";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";
import colors from "../constants/color.js";
import fonts from "../constants/font.js";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const sources = await getSource(offset);
    if (sources.length !== 0) {
      setData([...data, ...sources]);
      setOffset(offset + 1);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <QuizCard
              id={item._id}
              title={item.title}
              author={item.ownerId.username}
              tags={item.tags}
            />
          );
        }}
        keyExtractor={(item) => `${item._id}`}
        onEndReached={fetchData}
        onEndReachedThreshold={0.1} // Adjust as needed
        ListFooterComponent={loading && <ActivityIndicator />}
      />
      <View className="my-5"></View>
      {/* <QuizCard /> */}
      <View style={styles.emptyContainer}>
        {/* Waiting For System Traversal Tab*/}
      </View>
    </View>
    // <View>
    //   <Text>History</Text>
    // </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: colors.gray_bg,
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
  },
});
