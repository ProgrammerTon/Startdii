import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from "react-native";
import InvenSourceCard from "../app/inventorynote/E1_InvenSourceCard.jsx";
import InvenQuizCard from "../app/inventoryquiz/F1_InvenQuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../context/GlobalProvider.js";
import { useFocusEffect } from "expo-router";
import colors from "../constants/color.js";
import { getQuizInventory } from "../services/UserService";
import { getSourceInventory } from "../services/UserService";

const Inventory = ({ id }) => {
  const { user } = useGlobalContext();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const [AddToggleNoteQuizVisible, setAddToggleNoteQuizVisible] =
    useState(false);
  const [isSearchNote, setIsSearchNote] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = async () => {
    console.log("Hello", id);
    setLoading(true);
    if (isSearchNote) {
      const sources = await getSourceInventory(id);
      setData(sources ? sources.reverse() : []);
    } else {
      const quizes = await getQuizInventory(id);
      console.log("My Quiz", quizes);
      setData(quizes ? quizes.reverse() : []);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        fetchData();
      }
    }, [id, isSearchNote])
  );

  useEffect(() => {
    fetchData();
  }, [isSearchNote]);

  const handleToggleSearch = async (e) => {
    if (e && !isSearchNote) {
      setRefreshing(true);
      setIsSearchNote(e);
      setData([]);  
      setRefreshing(false);
    }
    if (!e && isSearchNote) {
      setRefreshing(true);
      setIsSearchNote(e);
      setData([]);
      setRefreshing(false);
    }
    toggleOption();
  };

  const toggleOption = async () => {  
    setOffset(1);
    setData([]);
    setIsSearchNote(!isSearchNote);
  };

  const optionText = isSearchNote ? "Note" : "Quiz";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isSearchNote ? styles.searchNote : styles.searchQuiz}
        onPress={(e) => handleToggleSearch(e)}
      >
        <Text style={styles.optionText}>{optionText}</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (isSearchNote) {
            const fav = user?.favorite_sources?.includes(item?._id)
              ? true
              : false;
            const datenow = new Date();
            const createdAt = new Date(item?.createdAt);
            const diffTime = Math.abs(datenow - createdAt);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const result = diffDays < 1 ? 1 : diffDays;
            return (
              <InvenSourceCard
                id={item?._id}
                title={item?.title}
                author={item?.ownerId?.username}
                tags={item?.tags}
                rating={item?.avg_rating_score}
                isFavorite={fav}
                date={result}
              />
            );
          } else {
            const fav = user?.favorite_quizzes?.includes(item?._id)
              ? true
              : false;
            const datenow = new Date();
            const createdAt = new Date(item?.createdAt);
            const diffTime = Math.abs(datenow - createdAt);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const result = diffDays < 1 ? 1 : diffDays;
            return (
              <InvenQuizCard
                id={item?._id}
                title={item?.title}
                author={item?.ownerId?.username}
                tags={item?.tags}
                rating={item?.avg_rating_score}
                isFavorite={fav}
                date={result}
              />
            );
          }
        }}
        keyExtractor={(item, ind) => `${item._id}-${ind}`}
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData()} // Load more data when the list reaches the end
        onEndReachedThreshold={0.1} // Adjust as needed
      />
      <View className="my-5"></View>
      {/* <QuizCard /> */}
      <View style={styles.emptyContainer}>
        {/* Waiting For System Traversal Tab*/}
      </View>
    </View>
    // <View>
    //   <Text>Inventory</Text>
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
  searchNote: {
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    width: "22%",
    alignItems: "center",
  },
  searchQuiz: {
    backgroundColor: colors.green,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    width: "22%",
    alignItems: "center",
  },
  optionText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 12,
  },
});
