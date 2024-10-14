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
import fonts from "../../constants/font";
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
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>Edit Quiz</Text>
      </View>
      <ScrollView style={styles.content}>

        <Text style={[fonts.EngSemiBold16, styles.label]}>Name</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Name"
        />

        <Text style={[fonts.EngSemiBold16, styles.label]}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <Text style={[fonts.EngSemiBold16, styles.label]}>Tag (Use comma to seperate Tag. Ex. : KU,Mining)</Text>
        <TextInput
          style={styles.input}
          value={tags}
          onChangeText={setTags}
          placeholder="Tags"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
            <Text style={[fonts.EngMedium16, styles.resetButtonText]}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <Text style={[fonts.EngMedium16, styles.nextButtonText]}>Next</Text>
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
    backgroundColor: colors.gray_bg,
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
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 5,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: colors.black,
  },
  content: {
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray_bg,
  },
  title: {
    // fontSize: 24,
    // fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: colors.black,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black,
  },
  input: {
    height: 40,
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  textarea: {
    height: 120,
    borderColor: colors.gray_button,
    borderWidth: 1.75,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    height: 42,
    paddingHorizontal: 25,
    backgroundColor: colors.gray_button,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: colors.black,
  },
  nextButton: {
    height: 42,
    paddingHorizontal: 25,
    backgroundColor: colors.blue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: colors.white,
  },
});
