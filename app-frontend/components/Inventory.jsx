import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import InvenSourceCard from "../app/inventorynote/E1_InvenSourceCard.jsx";
import InvenQuizCard from "../app/inventoryquiz/F1_InvenQuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { getSource } from "../services/SourceService";
import { useGlobalContext } from "../context/GlobalProvider.js";
import { ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import colors from "../constants/color.js";
import fonts from "../constants/font.js";
import { getQuizInventory } from "../services/UserService";
import { getSourceInventory } from "../services/UserService";
import ToggleNoteQuiz from "./ToggleNoteQuiz.jsx";
const Inventory = () => {
  const { user } = useGlobalContext();
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const [AddToggleNoteQuizVisible, setAddToggleNoteQuizVisible] =
    useState(false);
  const [isSearchNote, setIsSearchNote] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    if (isSearchNote) {
      const sources = await getSourceInventory(user._id);
      setData(sources ? sources.reverse() : []);
    } else {
      const quizes = await getQuizInventory(user._id);
      setData(quizes ? quizes.reverse() : []);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
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
            return (
              <InvenSourceCard
                id={item?._id}
                title={item?.title}
                author={item?.ownerId?.username}
                tags={item?.tags}
                rating={item?.avg_rating_score}
                isFavorite={fav}
              />
            );
          } else {
            const fav = user?.favorite_quizzes?.includes(item?._id)
              ? true
              : false;
            return (
              <InvenQuizCard
                id={item?._id}
                title={item?.title}
                author={item?.ownerId?.username}
                tags={item?.tags}
                rating={item?.avg_rating_score}
                isFavorite={fav}
              />
            );
          }
        }}
        keyExtractor={(item, ind) => `${item._id}-${ind}`}
        contentContainerStyle={{ paddingBottom: 110 }}
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
