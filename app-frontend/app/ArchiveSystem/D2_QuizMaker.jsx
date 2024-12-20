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
import colors from "../../constants/color";
import fonts from "../../constants/font";
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

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

        // return {
        //   question: questionText,
        //   qType: selectedOption,
        //   choices: selectedOption === "choice" ? Object.values(textInputs) : [],
        //   answers:
        //     selectedOption === "fill"
        //       ? isNaN(parseFloat(value))
        //         ? value
        //         : parseFloat(value)
        //       : activeButtons,
        // };
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerText]}>Create Quiz</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          //ref={listRef}
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
        {/*
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity style={styles.publishButton} onPress={Publish}>
          <Text style={[fonts.EngMedium16, styles.buttonText]}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuizMakerPage;

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
