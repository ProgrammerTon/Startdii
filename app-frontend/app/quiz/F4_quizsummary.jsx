import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import CommentBox from "../Quiz_Component/CommentBlock";
import RatingBlock from "../Quiz_Component/Rating";
import SumButton from "../Quiz_Component/SummaryButton";
import CommentBar from "../Quiz_Component/CommentBar";
import RatingBar from "../Quiz_Component/RatingBar";
import { TimeDateBlock, UsernameBlock } from "../Quiz_Component/Time_Username";
import AnswerButton from "../quizzes/AnswersButton";
import ScoreProgress from "../quizzes/ScoreProgressBar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { findQuiz } from "../../services/QuizService";
import { getCommentsQuiz } from "../../services/CommentService";
import { createCommentSource } from "../../services/CommentService";
import { ratingQuiz } from "../../services/QuizService";
import { router, useFocusEffect } from "expo-router";
import { getAnswers } from "../../services/QuizService";
import { useQuestionContext } from "../../context/QuestionProvider";
import StatButton from "../Quiz_Component/StatButton";
import { getUserRatingQuiz } from "../../services/QuizService";
import Loading from "../test_loading/test";

const { width, height } = Dimensions.get("window");

const QuizSummaryPage = () => {
  const [eachQuestionAnswers, setEachQuestionAnswers] = useState([]);
  const { questions, quizId } = useQuestionContext();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [score, setScore] = useState(0);
  const [ratingScore, setRatingScore] = useState(0);

  const handleSubmitComment = async () => {
    if (commentInput.trim() === "") return; // Prevent empty comments

    // Create a new comment object
    const newComment = {
      username: user.username, // Replace with dynamic username if available
      date: new Date().toLocaleDateString(),
      comment: commentInput,
    };

    // Add the new comment to the top of the comments list
    setComments([newComment, ...comments]);

    const data = await createCommentSource(null, quizId, commentInput);
    if (!data) {
      Alert.alert("Failed");
    }

    // Clear the comment input
    setCommentInput("");
  };

  const fetchQuiz = async () => {
    const data = await findQuiz(quizId);
    if (!data) {
      return null;
    }
    console.log("Quiz", data);
    const date = new Date(data.updatedAt);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    }).format(date);
    data.date = formattedDate;
    setQuiz(data);
  };

  const fetchComments = async () => {
    const data = await getCommentsQuiz(quizId);
    if (data) {
      const newComment = data.map((com) => ({
        username: com.parentComment.username, // Replace with dynamic username if available
        date: new Date(com.parentComment.updatedAt).toLocaleDateString(),
        comment: com.parentComment.content,
      }));
      const reversedComments = newComment.reverse();
      setComments([...reversedComments]);
    }
  };

  const fetchRating = async () => {
    const data = await getUserRatingQuiz(user._id, quizId);
    setRatingScore(data);
  };

  const onRefresh = async () => {
    await Promise.all([fetchQuiz(), fetchComments(), fetchRating()]);
  };

  const handleRating = async (sc) => {
    await ratingQuiz(quizId, user._id, sc);
    setRatingScore(sc);
    fetchQuiz();
  };

  const fetchGetAnswers = async () => {
    const data = await getAnswers(quizId);
    console.log("User Ans", data);
    if (data) {
      setUserAnswers(data.answers);
      let countScore = 0;
      const numericArray = data.results.map((item) => {
        if (item) {
          countScore += 1;
          return 1;
        }
        return 0;
      });
      setScore(countScore);
      setEachQuestionAnswers([numericArray]);
    }
  };

  const initPage = async () => {
    setRefreshing(true);
    await Promise.all([onRefresh(), fetchGetAnswers()]);
    setRefreshing(false);
  };

  useEffect(() => {
    if (quizId) {
      initPage();
    }
  }, [quizId]);

  return refreshing ? (
    <Loading />
  ) : (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#9Bd35A", "#689F38"]} // Optional: Customize refresh colors
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Finished</Text>
      </View>
      {/* Score and progress bar container */}
      <View style={styles.scoreProgressContainer}>
        <Text style={styles.scoreText}>
          {score} / {questions?.length}
        </Text>
        <ScoreProgress percent={(score / questions?.length) * 100} />
      </View>

      <StatButton handleOnPress={() => router.push("/quiz/F7_quizstatistic")} />
      {userAnswers?.length && eachQuestionAnswers?.length ? (
        <AnswerButton
          eachQuestionAnswers={eachQuestionAnswers}
          userAnswers={userAnswers}
          quizData={questions}
        />
      ) : null}
      <RatingBlock
        ScoreRating={Math.round(quiz?.averageScore)}
        numComment={quiz?.count}
      />
      <RatingBar onRatingChange={handleRating} initialRating={ratingScore} />

      {/* CommentBar with input */}
      <CommentBar
        value={commentInput}
        handleChangeText={setCommentInput}
        onSubmit={handleSubmitComment} // Submits on pressing "Done" on keyboard
      />

      {/* Render all comments */}
      {comments.map((comment, index) => (
        <CommentBox
          key={index}
          username={comment.username}
          date={comment.date}
          comment={comment.comment}
        />
      ))}
    </ScrollView>
  );
};

export default QuizSummaryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    backgroundColor: "#04B36E",
    height: height * 0.1,
    padding: height * 0.02,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  scoreProgressContainer: {
    alignItems: "center", // Center contents horizontally
    marginVertical: 20,
  },
  scoreText: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center", // Center the text
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  answerText: {
    fontSize: 16,
  },
  correctText: {
    fontSize: 16,
    color: "green",
  },
});
