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
import BackButton from "../../components/BackButton";  // Add BackButton import
import colors from "../../constants/color";
import fonts from "../../constants/font";
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
  const [commentInput, setCommentInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleSubmitComment = async () => {
    if (commentInput.trim() === "") return;
    const newComment = {
      username: user.username,
      date: new Date().toLocaleDateString(),
      comment: commentInput,
    };
    setComments([newComment, ...comments]);

    const data = await createCommentSource(null, id, commentInput);
    if (!data) {
      Alert.alert("Failed");
    }
    setCommentInput("");
  };

  const fetchQuiz = async () => {
    const data = await findQuiz(id);
    if (!data) {
      return null;
    }
    const date = new Date(data.updatedAt);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
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
      username: com.parentComment.username,
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
      {/* Header with BackButton */}
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={30} color={colors.green} />
        </TouchableOpacity>
        <Text style={[fonts.EngBold22, styles.headerTitle]}>
          {quiz?.title?.match(/.{1,15}/g).join("\n")} {/* Handle long title */}
        </Text>
        {user?._id === quiz?.ownerId._id && (
          <View style={styles.editDeleteContainer}>
            <EditQuizComponent quizId={id} />
            <DeleteQuizComponent quizId={id} />
          </View>
        )}
      </View>

      {/* ScrollView for the content */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      >
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
              // onPress={() => router.push(`profile/${quiz.ownerId._id}`)}
            >
              <Text style={[fonts.EngMedium12, styles.authorText]}>
                By {quiz?.ownerId?.username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerQs}>{quiz?.questions?.length} Questions</Text>
        <StatButton
          handleOnPress={() =>
            router.push({
              pathname: "/inventoryquiz/F7_InvenStatistic",
              params: {
                quizId: id,
              },
            })
          }
        />
        <RatingBlock
          ScoreRating={Math.round(quiz?.avg_rating_score)}
          numComment={quiz?.rating_count}
        />
        <RatingBar onRatingChange={handleRating} initialRating={ratingScore} />

        {/* CommentBar with input */}
        <CommentBar
          value={commentInput}
          handleChangeText={setCommentInput}
          onSubmit={handleSubmitComment}
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
    padding: 16,
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
  headerTitle: {
    marginLeft: width * 0.13,
    flexGrow: 1, 
    color: colors.black,
    textAlign: "center",
  },
  editDeleteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  headerContainer: {
    padding: 0,
  },
  headerQs: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: width * 0.05,
  },
  dateAuthorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  authorText: {
    color: colors.blue,
  },
  description: {
    marginBottom: 10,
    color: colors.black,
  },
  authorContainer: {
    backgroundColor: colors.white,
    paddingVertical: 6,
    paddingHorizontal: width * 0.025,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.blue,
  },
});
