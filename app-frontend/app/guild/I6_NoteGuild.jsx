import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import SourceCard from "../../components/E1_SourceCard";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { getGuildSource } from "../../services/ChatService";
import { useLocalSearchParams, router } from "expo-router";
import colors from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");
const NoteGuildPage = () => {
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
      const sources = await getGuildSource(room, of);
      console.log(offset, sources);
      if (sources && sources?.length !== 0) {
        if (refreshing) {
          setData(sources);
        } else {
          setData((prevData) => {
            return [...prevData, ...sources];
          });
        }
        setOffset(of + 1);
      } else {
        setIsEnd(true);
      }
    }
  };

  useEffect(() => {
    if (room && offset === 0) {
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
        <Text style={styles.headerText}>Note</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const fav =
            user?.favorite_sources?.includes(item.sourceId._id) || false;
          return (
            <SourceCard
              id={item.sourceId._id}
              title={item.sourceId.title}
              author={item.sourceId.ownerId.username}
              tags={item.sourceId.tags}
              isFavorite={fav}
              rating={item.sourceId.avg_rating_score}
            />
          );
        }}
        keyExtractor={(item, ind) => ind}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData(offset)}
        onEndReachedThreshold={0.1}
        style={styles.sourceList}
      />
    </View>
  );
};

export default NoteGuildPage;

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
    backgroundColor: colors.yellow,
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
    color: "#000",
    fontWeight: "bold",
  },
  sourceList: {
    padding: 20,
  }
});
