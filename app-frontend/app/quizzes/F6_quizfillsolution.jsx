import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  TextInput
} from "react-native";
import { React, useState } from "react";
import QuizChoice from "../../components/QuizChoice";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router , useLocalSearchParams,useRouter} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import colors from "../../constants/color";
import fonts from "../../constants/font";

const { width, height } = Dimensions.get('window');

//{questionData,questionNumber,totalQuestions}
export default function QuizFillSolution() {

  const [closeQuiz, setCloseQuiz] = useState(false);
  /*
  const questionData = [
    {
      question: "2+2",
      qtype: "fill",
      choice: [], 
      answer: [4], // The correct answer is 4
    },
  ];
  const questionNumber = 2;
  const totalQuestions = 3;
  const questionAnswer = ["4"]; // This is what users input
  */
  const { questionData, questionAnswer, questionNumber, totalQuestions } = useLocalSearchParams();
  const parsedQuestionData = JSON.parse(questionData);
  const parsedQuestionAnswer = parseInt(JSON.parse(questionAnswer));
  //parsedQuestionAnswer = isNaN(parsedQuestionAnswer) ? undefined : parsedQuestionAnswer;
  const parsedCorrectQuestionAnswer = (parseInt(parsedQuestionData.answer === undefined) ? NaN : parseInt(parsedQuestionData.answer));
  let isCorrectTrue = (parsedQuestionAnswer !== parsedCorrectQuestionAnswer);
  if (isNaN(parsedCorrectQuestionAnswer) && isNaN(parsedQuestionAnswer)) {
    console.log("This Question has NaN Answer and User input NaN Answer");
    isCorrectTrue = false;
  }
  console.log("Correct or Not : ",isCorrectTrue);
  console.log("Question Data : ", parsedQuestionData);
  console.log("Array of users Answer: ", parsedQuestionAnswer);
  console.log("Question Answer: ",parsedCorrectQuestionAnswer);
  console.log("QNum = ", questionNumber);
  console.log("Total =", totalQuestions);
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
          {isCorrectTrue &&
            <Text style={[fonts.EngSemiBold18, styles.textStyle]}>Your Answer :</Text>
          }
          <QuizChoice
            content={parsedQuestionAnswer}
            isSelected={true}
            onPress={() => (null)}
            isCorrect={!isCorrectTrue}
            isMultipleAnswer={false}
            isSolutionType={true}
            isFillType={true}
          />
          {isCorrectTrue &&
            <View style={{ marginTop: 10 }}>
              <Text style={[fonts.EngSemiBold18, styles.textStyle]}>Corrected Answer :</Text>
              <QuizChoice
                content={parsedQuestionData.answer}
                isSelected={true}
                onPress={() => null}
                isCorrect={true}
                isSolutionType={true}
                isFillType={true}
              />
            </View>
          }
        </View>
        {/*<View>
          <TouchableOpacity style={styles.nextButton} onPress={() => console.log(answer)}>
            <Text style={{fontSize: 16, color: "#fff"}}> Next </Text>
          </TouchableOpacity>
        </View>*/}
      </View>
      <Modal transparent={true} visible={closeQuiz}>
        <View style={{ flex: 1, backgroundColor: "#555555aa" }}>
          <View style={styles.leaveQuizPopUp}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}> Do you want to Leave Quiz? </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
              <TouchableOpacity style={styles.closeQuizButton} onPress={() => setCloseQuiz(false)}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.leaveQuizButton}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.white }}> Leave </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
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
    marginTop: height * 0.12,
    marginBottom: height * 0.2,
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  nextButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginRight: 20,
    marginVertical: -height * 0.15,
    backgroundColor: "#0270ED",
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  textarea: {
    height: 100,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.green, // Green
    borderStyle: "solid",
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
    justifyContent: "center",
    //niggaalignSelf: "center",
  },
  headerText: {
    flex: 1,
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  closeQuizButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#bbb",
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  leaveQuizButton: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: "#F44D19",
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
  },
  leaveQuizPopUp: {
    backgroundColor: colors.white,
    marginTop: height * 0.4,
    margin: 50,
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    height: height * 0.15
  }
})
