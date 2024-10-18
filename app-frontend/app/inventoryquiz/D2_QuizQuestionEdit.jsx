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
import fonts from "../../constants/font";
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome } from "@expo/vector-icons";

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
      <Text style={[fonts.EngSemiBold18, styles.questionNumber]}>Question {index + 1}</Text>
      <QuestionComponent
        questionNumber={index + 1}
        question={item}
        setQuestions={setQuestions}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteQuestion(item.id)}
      >
        <Text style={[fonts.EngMedium16, styles.deleteText]}>Delete</Text>
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
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>Edit Quiz</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          ref={listRef}
          data={questions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <Text style={[fonts.EngBold18, styles.counterText]}>
              Total Questions: {questions.length}
            </Text>
          }
          ListFooterComponent={
            <TouchableOpacity style={styles.addButton} onPress={addNewQuestion}>
              <FontAwesome name="plus" size={25} color={colors.white} />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Removed the Save button as per your requirement */}
        <TouchableOpacity style={styles.publishButton} onPress={Publish}>
          <Text style={[fonts.EngMedium16, styles.buttonText]}>Publish</Text>
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
    height: height * 0.82,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray_bg,
  },
  counterText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: colors.black,
  },
  questionContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: width * 0.05,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  questionNumber: {
    color: colors.black,
  },
  deleteButton: {
    backgroundColor: colors.red,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 50,
    alignSelf: "center",
  },
  deleteText: {
    color: colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  publishButton: {
    backgroundColor: colors.blue,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 50,
  },
  buttonText: {
    color: colors.white,
  },
  addButton: {
    backgroundColor: colors.green,
    paddingVertical: width * 0.04,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal: width * 0.33,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
