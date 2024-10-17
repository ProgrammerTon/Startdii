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
import colors from "../../constants/color";
import fonts from "../../constants/font";
import { router, useRouter , useLocalSearchParams} from "expo-router";

const { width, height } = Dimensions.get('window');

export default function QuizChoiceSolution() {
  const { questionData, questionAnswer, questionNumber, totalQuestions } = useLocalSearchParams();
  console.log("Question Data : ",questionData)
  console.log("Array of users Answer: ",questionAnswer)
  console.log("QNum = ",questionNumber)
  console.log("Total =",totalQuestions)
  const parsedQuestionData = JSON.parse(questionData);
  const parsedQuestionAnswer = JSON.parse(questionAnswer);
  // Function to check if the given choice is already selected
  const checkingSelected = (index) => {
    return parsedQuestionAnswer.includes(index); // Check if the answer is in the user's selected answers
  };

  // Function to check if the given choice is part of the correct answer
  const isCorrect = (index) => {
    return parsedQuestionData.answer.includes(index); // Check if the answer is correct
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.closeQuiz}>
          <TouchableOpacity
            style={{ backgroundColor: colors.white, borderRadius: 20, padding: 5 }}
            onPress={() => router.back()}
          >
            <Entypo name="chevron-left" size={30} color={colors.blue} />
          </TouchableOpacity>
        </View>
        <View style={styles.quizNumber}>
          <Text style={[fonts.EngBold18, styles.textNumber]}>{questionNumber} / {totalQuestions}</Text>
        </View>
        <View style={styles.question}>
          <Text style={[fonts.EngRegular18, styles.textStyle]}>{parsedQuestionData.question}</Text>
        </View>
      </View>

      <View style={styles.bottomPart}>
        <View style={styles.choice}>
          <ScrollView>
            {parsedQuestionData.choice.map((item, index) => (
              <QuizChoice
                key={index}
                content={item}
                isSelected={checkingSelected(index)} // Check if it's selected from `questionAnswer`
                onPress={() => null} // No need for onPress since answers are pre-selected
                isCorrect={isCorrect(index)} // Check if the choice is correct
                isSolutionType={true} // Display as a solution
                isMultipleAnswer={(parsedQuestionData.answer.length > 1)}
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
    backgroundColor: colors.gray_bg,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '1%',
  },
  topPart: {
    height: height * 0.3,
    width: width,
    backgroundColor: colors.green,
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
    backgroundColor: colors.gray_button,
    padding: 8,
    paddingHorizontal: 15,
    marginTop: -height * 0.2,
    marginBottom: height * 0.08,
    zIndex: 1,
  },
  question: {
    width: width * 0.9,
    height: height * 0.25,
    backgroundColor: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginVertical: -height * 0.1,
    borderRadius: 10,
    borderStyle: "solid",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textNumber: {
    fontSize: 20,
    color: colors.black,
  },
  textStyle: {
    color: colors.black,
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
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.green, // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedContainer: {
    backgroundColor: colors.green, // Green background when selected
  },
  correctContainer: {
    borderColor: colors.green,
  },
  wrongContainer: {
    backgroundColor: colors.red, // Red background for wrong answers
  },
});
