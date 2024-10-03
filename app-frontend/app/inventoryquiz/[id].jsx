import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TagList from "../../components/TagList";
import { useGlobalContext } from "../../context/GlobalProvider";
import DescriptionBlock from "../Quiz_Component/descriptionBlock";
import Tag from "../Quiz_Component/Tag";
import StartButton from "../Quiz_Component/StartButton";
import { TimeDateBlock, UsernameBlock } from "../Quiz_Component/Time_Username";
import CommentBox from "../Quiz_Component/CommentBlock";
import RatingBlock from "../Quiz_Component/Rating";
import SumButton from "../Quiz_Component/SummaryButton";
import CommentBar from "../Quiz_Component/CommentBar";
import RatingBar from "../Quiz_Component/RatingBar";
import { findQuiz, ratingQuiz } from "../../services/QuizService";
import {
  getCommentsQuiz,
  createCommentSource,
} from "../../services/CommentService";
import { useQuestionContext } from "../../context/QuestionProvider";
import { getUserRatingQuiz } from "../../services/QuizService";
import TestReport from "../reportsystem/ReportTest";
import DeleteQuizComponent from "./DeleteQuizComponent";
import EditQuizComponent from "./EditQuizComponent";
import QuizFlow from "../quiz/F3_quizflow";
import StatButton from "../Quiz_Component/StatButton";
import BackButton from "../../components/BackButton";
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width, height } = Dimensions.get("window");

const SumQuizPage = () => {
  const { id } = useLocalSearchParams();
  //console.log(`Best ${id}`);
  const TotalQuestion = 11;
  const [quiz, setQuiz] = useState(null);
  const { user } = useGlobalContext();
  const { setQuestions, setQuizId, setQuizFinished } = useQuestionContext();
  const [isDone, setIsDone] = useState(false);
  const [ratingScore, setRatingScore] = useState(0);

  // State to hold the list of comments
  const [comments, setComments] = useState([]);
  // State for the input value in the CommentBar
  const [commentInput, setCommentInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle submitting a new comment
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
    console.log(`Kuy ${id}`);
    const data = await findQuiz(id);
    console.log("Quiz", data);
    if (!data) {
      return null;
    }
    //console.log("Quiz", data);
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
    const transformQuestions = data.questions.map((question) => {
      let answer;
      if (typeof question.answers === "string") {
        answer = [Number(question.answers)];
      } else {
        answer = question.answers;
      }
      return {
        question: question.question,
        qtype: question.qType,
        choice: question.choices,
        answer: answer,
      };
    });
    setQuestions([...transformQuestions]);
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
    setRefreshing(true);
    await fetchQuiz();
    await fetchComments();
    await fetchRating();
    setRefreshing(false);
  };

  const handleRating = async (sc) => {
    await ratingQuiz(id, user._id, sc);
    setRatingScore(sc);
  };

  useEffect(() => {
    setRefreshing(true);
    setQuizId(id);
    fetchQuiz();
    fetchComments();
    const isdoit = user.quiz_history.some((entry) => entry.id === id);
    setIsDone(isdoit);
    setQuizFinished(false);
    fetchRating();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header outside of ScrollView */}
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerStyle}>
            {quiz?.title?.split(" ").reduce((acc, word, i) => {
              return i % 10 === 0 && i !== 0
                ? `${acc}\n${word}`
                : `${acc} ${word}`;
            }, "").trim()}
          </Text>
          {user?._id === quiz?.ownerId._id && (
            <View style={styles.editDeleteContainer}>
              <EditQuizComponent quizId={id} />
              <DeleteQuizComponent quizId={id} />
            </View>
          )}
        </View>
      </View>
  
      {/* ScrollView for the rest of the content */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]} // Optional: Customize refresh colors
          />
        }
      >
        <DescriptionBlock QuizDescription={quiz?.description} />
        <View style={styles.tagsContainer}>
          {quiz?.tags.map((tag, ind) => {
            return <Tag key={`${tag}-{ind}`} label={`#${tag}`} />;
          })}
        </View>
        <View style={styles.headerContainer}>
          <TimeDateBlock timeDate={quiz?.date} />
          <UsernameBlock username={quiz?.ownerId?.username} />
        </View>
        <Text style={styles.headerQs}>{quiz?.questions?.length} Questions</Text>
        <StatButton handleOnPress={() => router.push({
          pathname: '/inventoryquiz/F7_InvenStatistic',
          params: {
            quizId: id,  
          },
        })} />
        <RatingBlock
          ScoreRating={Math.round(quiz?.avg_rating_score)}
          numComment={quiz?.rating_count}
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

export default SumQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_bg,
    height: "100%",
  },
  scrollContainer: {
    padding: 16, // Keep the padding for the ScrollView
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",   // Allows title to wrap if too long
    flexShrink: 1,      // Prevents the buttons from shrinking
  },
  tagsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  headerContainer: {
    padding: 0, // Set to 0 to remove padding
  },
  headerQs: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.green,
    paddingVertical: 0, // Optional: You can also keep this if needed
    paddingHorizontal: 0, // Optional: You can also keep this if needed
    height: height * 0.10,
  },
  editDeleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    flexGrow: 0,        // Ensures buttons remain visible and don't grow beyond
  },
});
