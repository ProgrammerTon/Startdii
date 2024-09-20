import React, { useEffect, useState } from "react";
import { StyleSheet, View,Alert } from "react-native";
import QuizFill from "../quizzes/F3_quizfill";
import QuizChoices from "../quizzes/F3_quizchoice";
import { useQuestionContext } from "../../context/QuestionProvider";
import QuizSummaryPage from "../quizzes/F4_quizsummary";
import { submitQuiz } from "../../services/QuizService";
import { useGlobalContext } from "../../context/GlobalProvider";
import QuizStatistics from "./F7_quizstatistic";
import { BackHandler } from "react-native";
import { router } from "expo-router";
import { useCallback } from "react";

const QuizFlow = () => {
  const { questions, quizId, quizFinished, setQuizFinished } =
    useQuestionContext();
  const { user } = useGlobalContext();
  const [quizData, setQuizData] = useState([]);
  const [eachQuestionAnswers, setEachQuestionAnswers] = useState([]);
  const [userState, setUserState] = useState("Answer");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const backAction = useCallback(() => {
    console.log(userState);
    if (userState === "Statistic") {
      setUserState("Summary");
      return true;
    } else {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => router.back() }
      ]);
      return true;
    }
  }, [userState]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backAction]);
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (userState === "Statistic") {
      setUserState("Summary");
      return true;
    }
    router.push(`/quiz/${quizId}`);
    return false;
  });

  const handleAnswerSubmit = (userAnswer) => {
    const correctAnswer = quizData[currentQuestion].answer;
    const isCorrect =
      JSON.stringify(correctAnswer) === JSON.stringify(userAnswer.map(Number));
    const updatedAnswers = [...eachQuestionAnswers];
    updatedAnswers[currentQuestion] = isCorrect ? 1 : 0;
    setEachQuestionAnswers(updatedAnswers);

    if (isCorrect) {
      setScore(score + 1);
      setEachQuestionAnswers([...eachQuestionAnswers, 1]);
    } else {
      setEachQuestionAnswers([...eachQuestionAnswers, 0]);
    }

    setUserAnswers([...userAnswers, userAnswer]);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
      setUserState("Summary");
    }
    console.log(updatedAnswers);
  };

  useEffect(() => {
    if (questions.length !== 0) {
      setQuizData([...questions]);
    }
  }, [questions]);

  const handleSubmitQuiz = async () => {
    const numericUserAns = userAnswers.map((subArray) => {
      // Map through each element in the sub-array
      return subArray.map((item) => (item !== undefined ? Number(item) : null));
    });
    const data = await submitQuiz(quizId, user._id, numericUserAns);
    console.log(data);
    if (data) {
      user.quiz_history.push({ id: quizId });
    }
  };

  useEffect(() => {
    if (quizFinished) {
      const numericUserAns = userAnswers.map((subArray) => {
        // Map through each element in the sub-array
        return subArray.map((item) =>
          item !== undefined ? Number(item) : null
        );
      });
      console.log("Transform UserAns", numericUserAns);
      handleSubmitQuiz();
    }
  }, [quizFinished]);

  if (quizData.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {!quizFinished ? (
        quizData[currentQuestion]?.qtype === "choice" ? (
          <QuizChoices
            questionData={quizData[currentQuestion]}
            onSubmit={handleAnswerSubmit}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizData.length}
          />
        ) : (
          <QuizFill
            questionData={quizData[currentQuestion]}
            onSubmit={handleAnswerSubmit}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizData.length}
          />
        )
      ) : null}
      {quizFinished && userState === "Summary" ? (
        <QuizSummaryPage
          score={score}
          userAnswers={userAnswers}
          quizData={quizData}
          eachQuestionAnswers={[eachQuestionAnswers]}
          id={quizId}
          handlesetUserState={(state) => setUserState(state)}
        />
      ) : null}

      {quizFinished && userState === "Statistic" ? <QuizStatistics /> : null}
    </View>
  );
};

export default QuizFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
