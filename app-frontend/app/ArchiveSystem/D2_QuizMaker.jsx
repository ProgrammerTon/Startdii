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
} from "react-native";
import UploadCompleteWindow from "../../components/UploadCompleteWindow";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import QuestionComponent from "./QuestionComponent";
import { useQuizContext } from "../../context/QuizProvider";
import { createQuiz } from "../../services/QuizService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router, useRouter } from "expo-router";
import { addUserExp, addGoalProgress } from "../../services/LevelService";

const { width } = Dimensions.get("window");

const QuizMakerPage = () => {
  const { title, description, tags } = useQuizContext();
  const [questions, setQuestions] = useState([
    { id: Date.now(), templateData: {} },
  ]);
  const { user } = useGlobalContext();

  //console.log('All questions:', JSON.stringify(questions, null, 2));

  useEffect(() => {
    //console.log('Questions updated:', questions);
  }, [questions]);

  const addNewQuestion = () => {
    if (questions.length <= 99) {
      setQuestions([...questions, { id: Date.now(), templateData: {} }]);
    } else {
      Alert.alert(`คุณขยันมาก แต่ผมแนะนำไปสร้างแบบทดสอบใหม่ดีกว่าครับ`);
      return;
    }
    //console.log('All questions:', JSON.stringify(questions, null, 2));
  };

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [questions]);

  const deleteQuestion = (idToRemove) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== idToRemove
    );
    setQuestions(updatedQuestions);
    //console.log('All questions after deletion:', JSON.stringify(updatedQuestions, null, 2));
  };

  const Publish = async () => {
    // Transform tags from a string into an array
    if (questions.length < 5) {
      Alert.alert(`You need to create at least 5 questions before publishing`);
      return;
    }
    transformTags = tags.split(",");
    console.log(title, description, transformTags);
    console.log(`Total Questions:`, questions.length);

    // Map through the questions and validate inputs
    try {
      const questionsNew = questions.map((question, index) => {
        console.log(`-------------`);
        const {
          questionText,
          selectedOption,
          value,
          choices,
          textInputs,
          activeButtons,
        } = question.templateData || {};

        // Validation: Check if the question text exists
        if (!questionText || questionText.trim() === "") {
          Alert.alert(
            `Please fill in the question text for Question ${index + 1}`
          );
          throw new Error("Unfilled question text");
        }

        if (selectedOption === "fill" && (!value || value.trim() === "")) {
          Alert.alert(`Please fill in the answer for Question ${index + 1}`);
          throw new Error("Unfilled answer in fill question");
        }

        if (
          selectedOption === "choice" &&
          (!textInputs ||
            Object.keys(textInputs).length !== choices ||
            Object.values(textInputs).some(
              (input) => !input || input.trim() === ""
            ))
        ) {
          Alert.alert(
            `Please fill in all choice text inputs for Question ${index + 1}`
          );
          throw new Error("Incomplete choices");
        }

        return {
          question: questionText,
          qType: selectedOption,
          choices: selectedOption === "choice" ? Object.values(textInputs) : [],
          answers:
            selectedOption === "fill"
              ? isNaN(parseFloat(value))
                ? value
                : parseFloat(value)
              : activeButtons,
        };
      });

      console.log(questionsNew);

      // Create quiz with the validated questions
      const data = await createQuiz(
        user._id,
        title,
        description,
        transformTags,
        questionsNew
      );

      if (data) {
        Alert.alert("Create Success");
        addUserExp(user._id, 20);
        addGoalProgress(user._id, 'post_quiz')
        // Navigate back after success
        router.back();
        router.back();
      } else {
        Alert.alert("Failed");
      }
    } catch (error) {
      console.log("Quiz creation failed: ", error);
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //ref={listRef}
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

      <View style={styles.buttonContainer}>
        {/*
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity style={styles.publishButton} onPress={Publish}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuizMakerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  counterText: {
    fontSize: width * 0.05, // Adjust font size based on screen width
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
    padding: width * 0.05, // Adjust padding based on screen width
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  questionNumber: {
    fontSize: width * 0.045, // Adjust font size
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: width * 0.03, // Adjust padding for button
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
    justifyContent: "space-around",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "#ccc",
    padding: width * 0.03,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#f39c12",
    padding: width * 0.03,
    borderRadius: 5,
  },
  publishButton: {
    backgroundColor: "#3498db",
    padding: width * 0.03,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 20,
  },
  plusText: {
    color: "#fff",
    fontSize: width * 0.08,
  },
});
