import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import { findQuiz } from "../../services/QuizService"; 
import colors from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const QuizDesEdit = () => {
  const { quizId, } = useLocalSearchParams(); 
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [tags, setTags] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [addErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] = useState(false); 

  useEffect(() => {
    const fetchQuizData = async () => {
      if (quizId) {
        try {
          const quizData = await findQuiz(quizId); 
          if (quizData) {
            setTitle(quizData.title || ""); 
            setDescription(quizData.description || ""); 
            setTags(quizData.tags ? quizData.tags.join(", ") : ""); 
          } else {
            Alert.alert("Error", "Quiz data not found.");
            router.back();
          }
        } catch (error) {
          Alert.alert("Error", "Failed to fetch quiz data.");
        }
      }
      setLoading(false); // Stop loading once the data is fetched
    };

    fetchQuizData();
  }, [quizId]);

  const resetFields = () => {
    setTitle(""); // Reset title field
    setDescription(""); // Reset description field
    setTags(""); // Reset tags field
  };

  const showErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true); // Show the error popup
  };

  const closeErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false); // Close the error popup
  };

  const nextStep = () => {
    // Validate that all fields are filled
    if (title.trim() === "" || description.trim() === "" || tags.trim() === "") {
      showErrorEmptyFieldWindow();
    } else {
      // Navigate to the next step (quiz questions edit page)
      router.push({
        pathname: '/inventoryquiz/D2_QuizQuestionEdit',
        params: { quizId,title,description,tags }
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.green} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Quiz</Text>
      </View>
      <ScrollView style={styles.content}>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Name"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <Text style={styles.label}>Tags (comma separated)</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Tags"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          <ErrorEmptyFieldWindow
            visible={addErrorEmptyFieldWindow}
            onClose={closeErrorEmptyFieldWindow}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default QuizDesEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
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
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    width: 100,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: "#000",
    fontSize: 16,
  },
  nextButton: {
    width: 100,
    height: 40,
    backgroundColor: "#3498db",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
