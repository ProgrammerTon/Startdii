import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getCurrentToken } from "../utils/asyncstroage";
import { getQuizHistory } from "../services/UserService";
import { useGlobalContext } from "../context/GlobalProvider";
import QuizCard from "../components/F1_QuizCard";
import { useFocusEffect } from "expo-router";

const Quiz_History_Page = ({ id }) => {
  const [data, setData] = useState(null);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    const token = await getCurrentToken();
    const data = await getQuizHistory(token);
    console.log("User Quiz History", data);
    setData(data ? data.reverse() : []);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const fav = user?.favorite_quizzes?.includes(item?._id) ? true : false;
        const datenow = new Date();
        const createdAt = new Date(item?.createdAt);
        const diffTime = Math.abs(datenow - createdAt);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const result = diffDays < 1 ? 1 : diffDays;
        return (
          <QuizCard
            id={item?._id}
            title={item?.title}
            author={item?.ownerId?.username}
            tags={item?.tags}
            rating={item?.avg_rating_score}
            isFavorite={fav}
            date={result}
          />
        );
      }}
      keyExtractor={(item, ind) => `${item._id}-${ind}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 210 }}
    />
  );
};

export default Quiz_History_Page;

const styles = StyleSheet.create({});
