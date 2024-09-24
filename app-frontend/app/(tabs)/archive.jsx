import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import AddNoteQuizWindow from "../ArchiveSystem/AddNoteQuizWindow.jsx";
import ArchiveSearchBar from "../../components/ArchiveSearchBar.jsx";
import ToggleNoteQuiz from "../../components/ToggleNoteQuiz.jsx";
import SourceCard from "../../components/E1_SourceCard.jsx";
import QuizCard from "../../components/F1_QuizCard.jsx";
import Feather from "@expo/vector-icons/Feather";
import { getFavoriteSource, getSource } from "../../services/SourceService";
import { getFavoriteQuiz, getQuiz } from "../../services/QuizService";
import { useGlobalContext } from "../../context/GlobalProvider.js";
import { ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import SafeAreaViewAndroid from "../../components/SafeAreaViewAndroid.jsx";
import colors from "../../constants/color.js";

const ArchiveMainPage = () => {
  const [ActiveFilter, setActiveFilter] = useState("Latest");
  const [AddWindowVisible, setAddWindowVisible] = useState(false);
  const [AddToggleNoteQuizVisible, setAddToggleNoteQuizVisible] =
    useState(false);
  const [filterDirection, setFilterDirection] = useState("↓");
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [isSearchNote, setIsSearchNote] = useState(true);
  const { user, isLogged } = useGlobalContext();

  const handleToggleSearch = (e) => {
    if (e && !isSearchNote) {
      setRefreshing(true);
      setIsSearchNote(e);
      setData([]);
      fetchToggle(1, true); // Fetch first page of notes
      setRefreshing(false);
    }
    if (!e && isSearchNote) {
      setRefreshing(true);
      setIsSearchNote(e);
      setData([]);
      fetchToggle(1, true); // Fetch first page of quizzes
      setRefreshing(false);
    }
  };

  const fetchToggle = async (of = offset, reset = false, isSearch = false) => {
    const sortOrder = filterDirection === "↓" ? "desc" : "asc";
    if (searchField.trim() !== "") {
      isSearch = true;
    }
    const { title, tags } = extractTitleAndTags(searchField);
    if (!isSearchNote) {
      const sources = await getSource(of, sortOrder, title, tags, ActiveFilter);

      if (sources && sources?.length !== 0) {
        if (reset) {
          setData([...sources]);
        } else {
          setData((prevData) => (reset ? sources : [...prevData, ...sources]));
        }
        setOffset(of + 1); // Increment the offset for pagination
      }
    } else {
      const quizs = await getQuiz(of, sortOrder, title, tags, ActiveFilter);

      if (quizs?.length !== 0) {
        setData((prevData) => (reset ? quizs : [...prevData, ...quizs]));
        setOffset(of + 1); // Increment the offset for pagination
      }
    }
  };

  const fetchData = async (of = offset, reset = false, isSearch = false) => {
    if (!refreshing) {
      const sortOrder = filterDirection === "↓" ? "desc" : "asc";
      if (searchField.trim() !== "") {
        isSearch = true;
      }
      const { title, tags } = extractTitleAndTags(searchField);
      console.log(title, tags);
      if (isSearchNote) {
        if (ActiveFilter === "Favorite") {
          const fav_sources = await getFavoriteSource(user._id);
          setData(fav_sources.favorite_sources.reverse());
        } else {
          const sources = await getSource(
            of,
            sortOrder,
            title,
            tags,
            ActiveFilter
          );

          if (sources && sources?.length !== 0) {
            if (!isSearch) {
              setData((prevData) =>
                reset ? sources : [...prevData, ...sources]
              );
              setOffset(of + 1); // Increment the offset for pagination
            } else {
              setData([...sources]);
              setOffset(of + 1); // Increment the offset for pagination
            }
          }
        }
      } else {
        if (ActiveFilter === "Favorite") {
          const fav_quizzes = await getFavoriteQuiz(user._id);
          setData(fav_quizzes.favorite_quizzes.reverse());
        } else {
          const quizs = await getQuiz(of, sortOrder, title, tags, ActiveFilter);

          if (quizs && quizs?.length !== 0) {
            if (!isSearch) {
              setData((prevData) => (reset ? quizs : [...prevData, ...quizs]));
              setOffset(of + 1); // Increment the offset for pagination
            } else {
              setData([...quizs]);
              setOffset(of + 1); // Increment the offset for pagination
            }
          }
        }
      }
    }
  };

  const extractTitleAndTags = (input) => {
    const parts = input.split(" "); // Split by " +"
    const tags = parts.map((word) => {
      if (word.startsWith("+")) {
        return word;
      }
      return null;
    });
    let title;
    if (parts[0].startsWith("+")) {
      title = null;
    } else {
      title = parts[0];
    }
    return { title, tags };
  };

  // Handle refresh to reset offset and refetch data
  const handleRefresh = async () => {
    setRefreshing(true);
    setOffset(1); // Reset offset
    setData([]);
    await fetchData(1, true); // Fetch first page of data
    setRefreshing(false);
  };

  // Trigger data fetch when filterDirection changes
  useEffect(() => {
    handleRefresh(); // Refresh data when filter changes
  }, [filterDirection]);

  // Initial fetch when component loads and handle login redirection
  useFocusEffect(
    useCallback(() => {
      if (!isLogged) {
        router.replace("/sign-in");
      } else {
        handleRefresh();
      }
    }, [])
  );

  const ToggleFilterChange = (filter) => {
    if (ActiveFilter === filter) {
      setFilterDirection((prevDirection) =>
        prevDirection === "↓" ? "↑" : "↓"
      );
    } else {
      setActiveFilter(filter);
      setFilterDirection(filter === "Latest" ? "↓" : "↑");
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

  const handleSubmitSearch = () => {
    setRefreshing(true);
    setData([]);
    fetchData(1, true);
    setRefreshing(false);
  };

  return (
    <SafeAreaViewAndroid style={styles.container}>
      <View style={styles.headerContainer}>
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
        <ArchiveSearchBar
          value={searchField}
          handleChangeText={(e) => setSearchField(e)}
          onSubmit={handleSubmitSearch}
        />
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
          if (isSearchNote) {
            const fav = user?.favorite_sources?.includes(item?._id)
              ? true
              : false;
            return (
              <SourceCard
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
              <QuizCard
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 110 }}
        onEndReached={() => fetchData()} // Load more data when the list reaches the end
        onEndReachedThreshold={0.1} // Adjust as needed
      />
      <View className="my-5"></View>
      {/* <QuizCard /> */}
      <View style={styles.emptyContainer}>
        {/* Waiting For System Traversal Tab*/}
      </View>
    </SafeAreaViewAndroid>
  );
};

export default ArchiveMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: colors.gray_bg,
    padding: 20,
    paddingTop: 50,
    // alignItems: "center",
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
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: "28%",
    alignItems: "center",
  },
  inactiveFilterButton: {
    backgroundColor: colors.gray_button,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: "28%",
    alignItems: "center",
  },
  filterText: {
    color: colors.white,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
  },
  emptyContainer: {
    flex: 1,
  },
  floatingButton: {
    backgroundColor: colors.red,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
    right: 20,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "bold",
  },
});
