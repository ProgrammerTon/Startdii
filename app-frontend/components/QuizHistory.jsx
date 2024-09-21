import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { getCurrentToken } from "../utils/asyncstroage";
import { getQuizHistory } from "../services/UserService";
import { useGlobalContext } from "../context/GlobalProvider";
import QuizCard from "../components/F1_QuizCard";

const Quiz_History_Page = () => {
  const [data, setData] = useState(null);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    const token = await getCurrentToken();
    const data = await getQuizHistory(token);
    console.log("User Quiz History", data);
    setData(data);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => {
        const fav = user?.favorite_quizzes?.includes(item?.quiz?._id)
          ? true
          : false;
        return (
          <QuizCard
            id={item?.quiz?._id}
            title={item?.quiz?.title}
            author={item?.quiz?.ownerId?.username}
            tags={item?.quiz?.tags}
            rating={item?.quiz?.avg_rating_score}
            isFavorite={fav}
          />
        );
      }}
      keyExtractor={(item, ind) => `${item._id}-${ind}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 110 }}
    />
  );
};

export default Quiz_History_Page;

const styles = StyleSheet.create({});
