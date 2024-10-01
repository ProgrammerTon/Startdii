import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import InvenSourceCard from "../app/inventorynote/E1_InvenSourceCard.jsx";
import InvenQuizCard from "../app/inventoryquiz/F1_InvenQuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalContext } from "../context/GlobalProvider.js";
import { useFocusEffect } from "expo-router";
import colors from "../constants/color.js";
import { getQuizInventory } from "../services/UserService";
import { getSourceInventory } from "../services/UserService";
import ToggleNoteQuiz from "./ToggleNoteQuiz.jsx";

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

  const openAddToggleNoteQuizVisible = () => {
    setAddToggleNoteQuizVisible(true);
  };

  const closeAddToggleNoteQuizVisible = () => {
    setAddToggleNoteQuizVisible(false);
  };

  const handleToggleSearch = (e) => {
    setRefreshing(true);
    setIsSearchNote(e);
    fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <TouchableOpacity
          onPress={openAddToggleNoteQuizVisible}
          style={{ marginRight: 10 }}
        >
          <Feather name="menu" size={24} color={colors.black} />
        </TouchableOpacity>
        <ToggleNoteQuiz
          visible={AddToggleNoteQuizVisible}
          onClose={closeAddToggleNoteQuizVisible}
          setValue={(e) => handleToggleSearch(e)}
        />
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
});
