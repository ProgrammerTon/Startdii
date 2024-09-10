import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import React from "react";
import QuizChoice from "../../components/QuizChoice";
import Entypo from '@expo/vector-icons/Entypo';

const { width, height } = Dimensions.get('window');

// Example questionData
export default function QuizChoiceSolution({ questionData, questionAnswer, questionNumber, totalQuestions }) {
  // Function to check if the given choice is already selected
  const checkingSelected = (index) => {
    return questionAnswer.includes(index); // Check if the answer is in the user's selected answers
  };

  // Function to check if the given choice is part of the correct answer
  const isCorrect = (index) => {
    return questionData.answer.includes(index); // Check if the answer is correct
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.closeQuiz}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", borderRadius: 20, padding: 5 }}
            onPress={() => { /* Handle navigation back */ }}
          >
            <Entypo name="chevron-left" size={30} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={styles.quizNumber}>
          <Text style={styles.textNumber}>{questionNumber} / {totalQuestions}</Text>
        </View>
        <View style={styles.question}>
          <Text style={styles.textStyle}>{questionData.question}</Text>
        </View>
      </View>

      <View style={styles.bottomPart}>
        <View style={styles.choice}>
          <ScrollView>
            {questionData.choice.map((item, index) => (
              <QuizChoice
                key={index}
                content={item}
                isSelected={checkingSelected(index)} // Check if it's selected from `questionAnswer`
                onPress={() => null} // No need for onPress since answers are pre-selected
                isCorrect={isCorrect(index)} // Check if the choice is correct
                isSolutionType={true} // Display as a solution
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '1%',
  },
  topPart: {
    height: height * 0.3,
    width: width,
    backgroundColor: "#04B36E",
  },
  bottomPart: {
    height: height * 0.7,
    width: width,
    justifyContent: "center",
  },
  closeQuiz: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: width * 0.05,
    marginTop: height * 0.07,
  },
  quizNumber: {
    alignSelf: "center",
    backgroundColor: "#ddd",
    padding: 7,
    paddingHorizontal: 15,
    marginTop: -height * 0.2,
    marginBottom: height * 0.08,
    zIndex: 1,
  },
  question: {
    width: width * 0.9,
    height: height * 0.25,
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.02,
    marginVertical: -height * 0.1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
  },
  textNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 20,
  },
  choice: {
    flex: 4,
    width: width * 0.9,
    padding: 10,
    marginTop: height * 0.1,
    marginBottom: height * 0.15,
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  choiceContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#04B36E", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedContainer: {
    backgroundColor: "#04B36E", // Green background when selected
  },
  correctContainer: {
    borderColor: "#29DE91", // Green border for correct answers
  },
  wrongContainer: {
    backgroundColor: "#F44D19", // Red background for wrong answers
  },
});
