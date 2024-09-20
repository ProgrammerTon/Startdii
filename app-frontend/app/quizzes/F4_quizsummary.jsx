import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import CommentBox from "../Quiz_Component/CommentBlock";
import RatingBlock from "../Quiz_Component/Rating";
import SumButton from "../Quiz_Component/SummaryButton";
import CommentBar from "../Quiz_Component/CommentBar";
import RatingBar from "../Quiz_Component/RatingBar";
import { TimeDateBlock, UsernameBlock } from "../Quiz_Component/Time_Username";
import AnswerButton from "./AnswersButton";
import ScoreProgress from "./ScoreProgressBar";
import { useGlobalContext } from "../../context/GlobalProvider";
import { findQuiz } from "../../services/QuizService";
import { getCommentsQuiz } from "../../services/CommentService";
import StatButton from "../Quiz_Component/StatButton";
import { createCommentSource } from "../../services/CommentService";
import { router } from "expo-router";
import { ratingQuiz } from "../../services/QuizService";
import { getUserRatingQuiz } from "../../services/QuizService";


const { width, height } = Dimensions.get("window");

const QuizSummaryPage = ({
  score,
  userAnswers,
  quizData,
  eachQuestionAnswers,
  id,
  handlesetUserState,
}) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [quiz, setQuiz] = useState(null);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
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

    const data = await createCommentSource(null, id, commentInput);
    if (!data) {
      Alert.alert("Failed");
    }

    // Clear the comment input
    setCommentInput("");
  };

  const fetchQuiz = async () => {
    const data = await findQuiz(id);
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
    const data = await getCommentsQuiz(id);
    const newComment = data.map((com) => ({
      username: com.parentComment.username, // Replace with dynamic username if available
      date: new Date(com.parentComment.updatedAt).toLocaleDateString(),
      comment: com.parentComment.content,
    }));
    const reversedComments = newComment.reverse();
    setComments([...reversedComments]);
  };

  const fetchRating = async () => {
    const data = await getUserRatingQuiz(user._id, id);
    setRatingScore(data);
  };

  const onRefresh = async () => {
    await fetchQuiz();
    await fetchComments();
    await fetchRating();
  };

  const handleRating = async (sc) => {
    await ratingQuiz(id, user._id, sc);
    setRatingScore(sc);
  const onRefresh = async () => {
    await fetchQuiz();
    await fetchComments();
  };

  const handleRating = async (sc) => {
    const data = await ratingQuiz(id, user._id, sc);
    console.log(data);
  };

  useEffect(() => {
    setRefreshing(true);
    fetchQuiz();
    fetchComments();
    fetchRating();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Finished</Text>
      </View>

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
        {/* Score and progress bar container */}
        <View style={styles.scoreProgressContainer}>
          <Text style={styles.scoreText}>
            {score} / {quizData.length}
          </Text>
          <ScoreProgress percent={(score / quizData.length) * 100} />
        </View>

        <StatButton handleOnPress={() => handlesetUserState("Statistic")} />
        <AnswerButton
          eachQuestionAnswers={eachQuestionAnswers}
          userAnswers={userAnswers}
          quizData={quizData}
        />
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
    </View>
  );
};

export default QuizSummaryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    backgroundColor: "#04B36E",
    padding: height * 0.02,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  scoreProgressContainer: {
    alignItems: "center", // Center contents horizontally
    marginBottom: 20,
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
