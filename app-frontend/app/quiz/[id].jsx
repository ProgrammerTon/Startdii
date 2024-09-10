import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
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

const SumQuizPage = () => {
  const { id } = useLocalSearchParams();
  const TotalQuestion = 11;
  const [quiz, setQuiz] = useState(null);
  const { user } = useGlobalContext();

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
    console.log("comment", reversedComments);
  };

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
    setRefreshing(false);
  }, []);

  return (
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
      <Text style={styles.headerStyle}>{quiz?.title}</Text>
      <DescriptionBlock />
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
      <StartButton />
      <RatingBlock ScoreRating={4.5} numComment={comments.length} />
      <RatingBar onRatingChange={handleRating} />

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

export default SumQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headerQs: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});