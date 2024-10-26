import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import QuizCard from "../../components/F1_QuizCard";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { useLocalSearchParams, router } from "expo-router";
import { getGuildQuiz } from "../../services/ChatService";
import colors from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quiz</Text>
      </View>
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
        style={styles.quizList}
      />
    </View>
  );
};

export default QuizUserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: height * 0.1,
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
  },
  quizList: {
    padding: 20,
  }
});
