import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  TextInput,
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
import colors from "../../constants/color";
import fonts from "../../constants/font";
import BackButton from "../../components/BackButton";
import Loading from "../test_loading/test";
import Entypo from "@expo/vector-icons/Entypo";
const { width, height } = Dimensions.get("window");

const SumQuizPage = () => {
  const { id } = useLocalSearchParams();
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

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Function to handle submitting a new comment
  const handleSubmitComment = async () => {
    if (commentInput.trim() === "") return; // Prevent empty comments

    // Create a new comment object
    const newComment = {
      username: user.username, // Replace with dynamic username if available
      date: formatDate(new Date()),
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
      date: formatDate(new Date(com.parentComment.updatedAt)),
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
    await Promise.all([fetchQuiz(), fetchComments(), fetchRating()]);
    setRefreshing(false);
  };

  const handleRating = async (sc) => {
    await ratingQuiz(id, user._id, sc);
    setRatingScore(sc);
    fetchQuiz(id);
  };

  const initPage = async () => {
    setRefreshing(true);
    setQuizId(id);
    await Promise.all([fetchQuiz(), fetchComments(), fetchRating()]);
    const isdoit = user.quiz_history.some((entry) => entry.id === id);
    setIsDone(isdoit);
    setQuizFinished(false);
    setRefreshing(false);
  };

  useEffect(() => {
    initPage();
  }, []);

  return refreshing ? (
    <Loading />
  ) : (
    <View style={styles.bg}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerTitle]}>{quiz?.title}</Text>
        <TestReport onPress={() => console.log("Report Button Pressed")} />
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
        {/* <DescriptionBlock QuizDescription={quiz?.description} />
        <View style={styles.tagsContainer}>
          {quiz?.tags.map((tag, ind) => {
            return <Tag key={`${tag}-{ind}`} label={`#${tag}`} />;
          })}
        </View>
        <View style={styles.headerContainer}>
          <TimeDateBlock timeDate={quiz?.date} />
          <UsernameBlock username={quiz?.ownerId?.username} />
        </View> */}

        {/* Description and Info */}
        <View style={styles.infoContainer}>
          <Text style={[fonts.EngRegular16, styles.description]}>
            {quiz?.description}
          </Text>
          {quiz && <TagList tags={quiz?.tags} />}
          <View style={styles.dateAuthorContainer}>
            <Text style={[fonts.EngRegular12, styles.dateText]}>
              {quiz?.date}
            </Text>
            <TouchableOpacity
              style={styles.authorContainer}
              onPress={() => router.push(`profile/${quiz.ownerId._id}`)}
            >
              <Text style={[fonts.EngMedium12, styles.authorText]}>
                By {quiz?.ownerId?.username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.qsContainer}>
          <Text style={[fonts.EngBold18, styles.headerQs]}>
            {quiz?.questions?.length} Questions
          </Text>
        </View>
        <StartButton handleOnPress={() => router.push("/quiz/F3_quizflow")} />
        {isDone ? (
          <SumButton
            handleOnPress={() => router.push("/quiz/F4_quizsummary")}
          />
        ) : null}

        <View style={styles.ratingContainer}>
          <RatingBlock
            ScoreRating={Math.round(quiz?.avg_rating_score)}
            numComment={quiz?.rating_count}
          />
          <RatingBar
            onRatingChange={handleRating}
            initialRating={ratingScore}
          />
        </View>

        {/* CommentBar with input */}
        <View style={styles.commentContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default SumQuizPage;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.gray_bg,
    height: "100%",
  },
  header: {
    backgroundColor: colors.green,
    textAlign: "center",
    height: "10.625%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    marginLeft: width * 0.13,
    width: "70%",
    color: colors.black,
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: width * 0.05,
  },
  description: {
    marginBottom: 10,
    color: colors.black,
  },
  dateAuthorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    color: colors.gray_font,
  },
  authorContainer: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: width * 0.025,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  authorText: {
    color: colors.blue,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: width * 0.04,
  },
  headerQs: {
    color: colors.black,
  },
  commentContainer: {
    marginTop: 12,
    marginHorizontal: width * 0.05,
  },
  ratingContainer: {
    marginHorizontal: width * 0.05,
  },
  qsContainer: {
    marginHorizontal: width * 0.05,
  },
});
