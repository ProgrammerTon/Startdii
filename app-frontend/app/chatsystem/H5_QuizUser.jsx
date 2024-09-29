import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import QuizCard from "../../components/F1_QuizCard";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { useLocalSearchParams } from "expo-router";
import { getGuildQuiz } from "../../services/ChatService";

const QuizUserPage = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const { room } = useLocalSearchParams();
  const [offset, setOffset] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setData([]);
    setOffset(1);
    setIsEnd(false);
    await fetchData(1);
    setRefreshing(false);
  };

  const fetchData = async (of) => {
    if (room && of && !isEnd) {
      console.log("Request with", room, of);
      const quizzes = await getGuildQuiz(room, of);
      console.log(offset, quizzes);
      if (quizzes && quizzes?.length !== 0) {
        setData((prevData) => {
          return [...prevData, ...quizzes];
        });
        setOffset(of + 1);
      } else {
        setIsEnd(true);
      }
    }
  };

  useEffect(() => {
    if (room && offset !== 0) {
      fetchData(offset);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const fav =
            user?.favorite_quizzes?.includes(item.quizId._id) || false;
          return (
            <QuizCard
              id={item.quizId._id}
              title={item.quizId.title}
              author={item.quizId.ownerId.username}
              tags={item.quizId.tags}
              isFavorite={fav}
              rating={item.quizId.avg_rating_score}
            />
          );
        }}
        keyExtractor={(item) => item.quizId._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData()}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default QuizUserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    padding : 20
  },
});
