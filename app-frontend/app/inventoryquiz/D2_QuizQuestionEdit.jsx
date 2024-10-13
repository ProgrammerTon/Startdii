import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  ActivityIndicator, // For loading indicator
} from "react-native";
import UploadCompleteWindow from "../../components/UploadCompleteWindow";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import QuestionComponent from "../ArchiveSystem/QuestionComponent";
import { useQuizContext } from "../../context/QuizProvider";
import { createQuiz, findQuiz } from "../../services/QuizService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";  
import colors from "../../constants/color";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const QuizQuestionEdit = () => {
  const { quizId,title, description, tags } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const { user } = useGlobalContext();

  const [loading, setLoading] = useState(true); // Loading state
  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] =
    useState(false);
  const [uploadComplete, setUploadComplete] = useState(false); // For UploadCompleteWindow

  const listRef = useRef(null);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      if (quizId) {
        const quizData = await findQuiz(quizId);
        if (quizData && quizData.questions) {
          // Transform existing questions to match the required structure
          const transformedQuestions = quizData.questions.map((q, index) => ({
            id: Date.now() + index, // Unique ID
            templateData: {
              questionText: q.question,
              selectedOption: q.qType,
              value: q.qType === "fill" ? q.answers : "",
              choices:
                q.qType === "choice" && Array.isArray(q.choices)
                  ? q.choices.length
                  : 0,
              textInputs:
                q.qType === "choice"
                  ? q.choices.reduce((acc, choice, idx) => {
                      acc[idx] = choice;
                      return acc;
                    }, {})
                  : {},
              activeButtons: q.answers || [],
            },
          }));
          setQuestions(transformedQuestions);
        } else {
          Alert.alert("Error", "Failed to fetch quiz questions.");
          router.back();
        }
      }
      setLoading(false);
    };

    fetchQuizQuestions();
  }, [quizId]);

  const addNewQuestion = () => {
    if (questions.length < 100) {
      setQuestions([
        ...questions,
        { id: Date.now(), templateData: {} },
      ]);
    } else {
      Alert.alert("Limit Reached", "You should create a new quiz.");
    }
  };

  useEffect(() => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Tags:", tags);
    console.log("Questions:", questions);
  }, [title, description, tags, questions]);

  const deleteQuestion = (idToRemove) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== idToRemove
    );
    setQuestions(updatedQuestions);
  };

  const ShowErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true);
  };

  const CloseErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false);
  };

  const Publish = async () => {
    if (questions.length < 5) {
      Alert.alert(
        "Insufficient Questions",
        "You need to create at least 5 questions before publishing."
      );
      return;
    }
  
    // Transform tags from a comma-separated string into an array
    const transformTags = tags.split(",").map((tag) => tag.trim());
  
    try {
      const questionsNew = questions.map((question, index) => {
        const {
          questionText,
          selectedOption,
          value,
          choices,
          textInputs,
          activeButtons,
        } = question.templateData || {};
  
        // Validation
        if (!questionText || questionText.trim() === "") {
          Alert.alert(
            "Incomplete Question",
            `Please fill in the question text for Question ${index + 1}.`
          );
          throw new Error("Unfilled question text");
        }
  
        if (selectedOption === "fill" && (!value || value.trim() === "")) {
          Alert.alert(
            "Incomplete Answer",
            `Please fill in the answer for Question ${index + 1}.`
          );
          throw new Error("Unfilled answer in fill question");
        }
  
        if (
          selectedOption === "choice" &&
          (!textInputs ||
            Object.keys(textInputs).length < 2 || 
            Object.values(textInputs).some(
              (input) => !input || input.trim() === ""
            ))
        ) {
          Alert.alert(
            "Incomplete Choices",
            `Please fill in all choice text inputs for Question ${index + 1}.`
          );
          throw new Error("Incomplete choices");
        }
  
        return {
          question: questionText,
          qType: selectedOption,
          choices:
            selectedOption === "choice"
              ? Object.values(textInputs).filter((choice) => choice.trim() !== "")
              : [],
          answers:
            selectedOption === "fill" ? value : activeButtons || [],
        };
      });
  
      // Log individual fields to confirm they're populated
      console.log(`userId : ${user._id}`);
      console.log(`title : ${title}`);
      console.log(`description : ${description}`);
      console.log(`transformTags : ${transformTags}`);
      console.log(`questionsNew : `, questionsNew);
  
      // Create a new quiz with the modified data
      const data = await createQuiz(
        user._id,
        title,
        description,
        transformTags,
        questionsNew
      );
      
      console.log(data);
  
      if (data) {
        setUploadComplete(true);
      } else {
        Alert.alert("Error", "Failed to create the quiz.");
      }
    } catch (error) {
      console.log("Quiz creation failed:", error);
    }
  };
  

  const renderItem = ({ item, index }) => (
    <View key={item.id} style={styles.questionContainer}>
      <Text style={styles.questionNumber}>Question {index + 1}</Text>
      <QuestionComponent
        questionNumber={index + 1}
        question={item}
        setQuestions={setQuestions}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteQuestion(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.green} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create Quiz</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          ref={listRef}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <Text style={styles.counterText}>
              Total Questions: {questions.length}
            </Text>
          }
          ListFooterComponent={
            <TouchableOpacity style={styles.addButton} onPress={addNewQuestion}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Removed the Save button as per your requirement */}
        <TouchableOpacity style={styles.publishButton} onPress={Publish}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
        <ErrorEmptyFieldWindow
          visible={AddErrorEmptyFieldWindow}
          onClose={CloseErrorEmptyFieldWindow}
        />
        <UploadCompleteWindow
          visible={uploadComplete}
          onClose={() => {
            setUploadComplete(false);
            router.back();
            router.back(); // Navigate back to previous screens if needed
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuizQuestionEdit;

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
    height: height * 0.82,
    padding: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  counterText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    padding: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  questionNumber: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: width * 0.03,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  publishButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
  plusText: {
    color: "#fff",
    fontSize: width * 0.08,
  },
});
