import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import UploadCompleteWindow from "../../components/UploadCompleteWindow";
import ErrorEmptyFieldWindow from "../../components/ErrorEmptyFieldWindow";
import QuestionComponent from "./QuestionComponent";
import { useQuizContext } from "../../context/QuizProvider";

const { width } = Dimensions.get("window");

const QuizMakerPage = () => {
  const { title, description, tags } = useQuizContext();
  const [questions, setQuestions] = useState([
    { id: Date.now(), templateData: {} },
  ]);

  //console.log('All questions:', JSON.stringify(questions, null, 2));

  useEffect(() => {
    //console.log('Questions updated:', questions);
  }, [questions]);

  const addNewQuestion = () => {
    setQuestions([...questions, { id: Date.now(), templateData: {} }]);
    //console.log('All questions:', JSON.stringify(questions, null, 2));
  };

  const deleteQuestion = (idToRemove) => {
    const updatedQuestions = questions.filter(
      (question) => question.id !== idToRemove
    );
    setQuestions(updatedQuestions);
    //console.log('All questions after deletion:', JSON.stringify(updatedQuestions, null, 2));
  };

  const Publish = () => {
    console.log(title, description, tags);
    console.log(`Total Questions:`, questions.length);
    questions.forEach((question, index) => {
      console.log(`-------------`);
      const {
        questionText,
        selectedOption,
        value,
        choices,
        textInputs,
        activeButtons,
      } = question.templateData || {};
      console.log(`Question ${index + 1}:`, questionText);
      console.log(`Choice Choosen: ${selectedOption}`);
      if (selectedOption === "fill") {
        console.log(`Number Answer: ${value}`);
      } else if (selectedOption === "choice") {
        console.log(`Number of Choices: ${choices}`);
        for (let i = 0; i < choices; i++) {
          console.log(`Choices ${i + 1}: ${textInputs[i] || ""}`);
        }
        console.log(`Correct Choices: ${activeButtons}`);
      }
    });
    console.log(`---------------------------------------------`);
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
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
