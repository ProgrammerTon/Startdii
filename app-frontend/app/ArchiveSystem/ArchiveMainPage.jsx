import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from "react-native";
import AddNoteQuizWindow from "./AddNoteQuizWindow.jsx";
import ArchiveSearchBar from "../../components/ArchiveSearchBar.jsx";
import ToggleNoteQuiz from "../../components/ToggleNoteQuiz.jsx";
import SourceCard from "../../components/E1_SourceCard.jsx";
import QuizCard from "../../components/F1_QuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { getSource } from "../../services/SourceService";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { ActivityIndicator } from "react-native";
import { router } from "expo-router";

const ArchiveMainPage = () => {
  const [ActiveFilter, setActiveFilter] = useState("Favorite");
  const [AddWindowVisible, setAddWindowVisible] = useState(false);
  const [AddToggleNoteQuizVisible, setAddToggleNoteQuizVisible] = useState(false);
  const [filterDirection, setFilterDirection] = useState("↓");
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const { isLogged } = useGlobalContext();

  const fetchData = async () => {
    setRefreshing(true);
    const sources = await getSource(offset);
    if (sources.length !== 0) {
      setData([...data, ...sources]);
      setOffset(offset + 1);
    }
    setRefreshing(false)
  };

  const handleRefresh = () => {
    setOffset(1);
    setData([])
    fetchData()
  }

  useEffect(() => {
    if (!isLogged) {
      router.replace("/sign-in");
    }
    fetchData();
    setRefreshing(false);
  }, []);

  const ToggleFilterChange = (filter) => {
    if (ActiveFilter === "Latest" || ActiveFilter === "Oldest") {
      setFilterDirection((prevDirection) =>
        prevDirection === "↓" ? "↑" : "↓"
      );
    } else {
      setActiveFilter(filter);
      //setFilterDirection(filter === "Latest" || filter === "Oldest" ? "↓" : "↑");
    }
  };

  const filterText =
    ActiveFilter === "Latest"
      ? `Latest ${filterDirection}`
      : `Oldest ${filterDirection}`;

  const openAddWindow = () => {
    setAddWindowVisible(true);
  };

  const closeAddWindow = () => {
    setAddWindowVisible(false);
  };

  const openAddToggleNoteQuizVisible = () => {
    setAddToggleNoteQuizVisible(true);
  };

  const closeAddToggleNoteQuizVisible = () => {
    setAddToggleNoteQuizVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={openAddToggleNoteQuizVisible}
          style={{ marginRight: 10 }}
        >
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
        <ToggleNoteQuiz
          visible={AddToggleNoteQuizVisible}
          onClose={closeAddToggleNoteQuizVisible}
        />
        <ArchiveSearchBar />
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={
            ActiveFilter === "Favorite"
              ? styles.filterButton
              : styles.inactiveFilterButton
          }
          onPress={() => ToggleFilterChange("Favorite")}
        >
          <Text style={styles.filterText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            ActiveFilter === "Rating"
              ? styles.filterButton
              : styles.inactiveFilterButton
          }
          onPress={() => ToggleFilterChange("Rating")}
        >
          <Text style={styles.filterText}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            ActiveFilter === "Latest" || ActiveFilter === "Oldest"
              ? styles.filterButton
              : styles.inactiveFilterButton
          }
          onPress={() =>
            ToggleFilterChange(ActiveFilter === "Latest" ? "Oldest" : "Latest")
          }
        >
          <Text style={styles.filterText}>{filterText}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={openAddWindow}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <AddNoteQuizWindow visible={AddWindowVisible} onClose={closeAddWindow} />
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <SourceCard
              id={item._id}
              title={item.title}
              author={item.ownerId.username}
              tags={item.tags}
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => `${item._id}`}
        onEndReached={fetchData}
        onEndReachedThreshold={0.1} // Adjust as needed
        ListFooterComponent={refreshing && <ActivityIndicator />}
        contentContainerStyle={{ paddingBottom: 300 }}
      />
      <View className="my-5"></View>
      {/* <QuizCard /> */}
      <View style={styles.emptyContainer}>
        {/* Waiting For System Traversal Tab*/}
      </View>
    </View>
  );
};

export default ArchiveMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#3367d6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: "28%",
    alignItems: "center",
  },
  inactiveFilterButton: {
    backgroundColor: "#cccccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: "28%",
    alignItems: "center",
  },
  filterText: {
    color: "#ffffff",
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
  },
  floatingButton: {
    backgroundColor: "#FF6347",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ef6d11",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
