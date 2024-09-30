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
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import TagList from "../../components/TagList";
import CommentBox from "../Quiz_Component/CommentBlock";
import RatingBlock from "../Quiz_Component/Rating";
import CommentBar from "../Quiz_Component/CommentBar";
import RatingBar from "../Quiz_Component/RatingBar";
import { findSource, ratingSource } from "../../services/SourceService";
import {
  getCommentsSource,
  createCommentSource,
} from "../../services/CommentService";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Image } from "expo-image";
import { baseUrl } from "@/constants/const";
import { getUserRatingSource } from "../../services/SourceService";
import TestReportNote from "../reportsystem/ReportNote";
import { router } from "expo-router";
import colors from "../../constants/color";
import fonts from "../../constants/font";
import BackButton from "../../components/BackButton";

const SourceDetailPage = () => {
  const { id } = useLocalSearchParams();
  const [source, setSource] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const [ratingScore, setRatingScore] = useState(0);

  const fetchSource = async (id) => {
    const data = await findSource(id);
    const dateStr = data.updatedAt;
    const date = new Date(dateStr);

    // Extract date and time parts
    const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, "-"); // "04-09-2024"
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }); // "11:38"
    // Combine date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    setSource({
      title: data.title,
      ownerName: data.ownerId.username,
      description: data.description,
      content: data.content,
      tags: data.tags,
      updated_at: formattedDateTime,
      score: data.avg_rating_score ? data.avg_rating_score : 0,
      count: data.rating_count ? data.rating_count : 0,
      filename: data.filename ? data.filename : null,
    });
    console.log({
      title: data.title,
      ownerName: data.ownerId.username,
      description: data.description,
      content: data.content,
      tags: data.tags,
      updated_at: formattedDateTime,
      score: data.avg_rating_score ? data.avg_rating_score : 0,
      count: data.rating_count ? data.rating_count : 0,
      filename: data.filename ? data.filename : null,
    });
    console.log(data?.filename);
  };

  useEffect(() => {
    setRefreshing(true);
    fetchSource(id);
    fetchComments(id);
    fetchRating();
    setRefreshing(false);
  }, []);

  // State to hold the list of comments
  const [comments, setComments] = useState([]);
  // State for the input value in the CommentBar
  const [commentInput, setCommentInput] = useState("");

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

    const data = await createCommentSource(id, null, commentInput);
    if (!data) {
      Alert.alert("Failed");
    }

    // Clear the comment input
    setCommentInput("");
  };

  const handleRating = async (sc) => {
    const data = await ratingSource(id, user._id, sc);
    setRatingScore(sc);
    console.log(data);
  };

  const fetchRating = async () => {
    const data = await getUserRatingSource(user._id, id);
    setRatingScore(data);
  };

  const fetchComments = async () => {
    const data = await getCommentsSource(id);
    const newComment = data.map((com) => ({
      username: com.parentComment.username, // Replace with dynamic username if available
      date: new Date(com.parentComment.updatedAt).toLocaleDateString(),
      comment: com.parentComment.content,
    }));
    const reversedComments = newComment.reverse();
    setComments([...reversedComments]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSource(id);
    await fetchRating();
    await fetchComments(id);
    setRefreshing(false);
  };

  const handleDownload = async () => {
    if (source?.filename) {
      const filetype = source.filename.endsWith(".pdf") ? "pdfs" : "images";
      const url = `${baseUrl}/files/${filetype}/${source.filename}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open this URL: " + url);
      }
    }
  };

  return (
    <View style={styles.bg}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton />
        <Text style={[fonts.EngBold22, styles.headerTitle]}>{source?.title}</Text>
        <TestReportNote
          sourceId={id} // Pass the sourceId to the report window
          onPress={() => console.log('Report Button Pressed')}
        />
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
        {/* Description and Info */}
        <View style={styles.infoContainer}>
          <Text style={[fonts.EngRegular16, styles.description]}>{source?.description}</Text>
          {source && <TagList tags={source?.tags} />}
          <View style={styles.dateAuthorContainer}>
            <Text style={[fonts.EngRegular12, styles.dateText]}>{source?.updated_at}</Text>
            <TouchableOpacity style={styles.authorContainer}>
              <Text style={[fonts.EngMedium12, styles.authorText]}>By {source?.ownerName}</Text>
            </TouchableOpacity>
          </View>
          <View style={[fonts.EngRegular16, styles.content]}>
            <Text >{source?.content}</Text>
          </View>
        </View>

        {["png", "jpg"].some((extension) =>
          source?.filename?.endsWith(extension)
        ) ? (
          <Image
            source={{ uri: `${baseUrl}/files/images/${source?.filename}` }}
            style={{ width: 200, height: 200 }} // Adjust the width/height as needed
          />
        ) : null}

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <FontAwesome name="download" size={38} color={colors.blue} />
            <Text style={[fonts.EngMedium14, styles.buttonText]}>Download</Text>
          </TouchableOpacity>
          {/*
          <TouchableOpacity style={styles.button} onPress={() => router.push("/ArchiveSystem/SharePage")}>
            <FontAwesome name="share" size={24} color="#0E68D9" />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          */}
        </View>

        <View style={styles.ratingContainer}>
          <RatingBlock
            ScoreRating={Math.round(source?.score)}
            numComment={source?.count}
          />
          <RatingBar onRatingChange={handleRating} initialRating={ratingScore} />
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

export default SourceDetailPage;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.gray_bg,
    height: '100%',
  },
  container: {
    flex: 1,
    // paddingHorizontal: 20,
  },
  header: {
    backgroundColor: colors.yellow,
    textAlign: "center",
    height: "10.625%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "relative",
  },
  headerTitle: {
    marginLeft: 63,
    width: '70%',
    color: colors.black,
  },
  infoContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  description: {
    marginBottom: 10,
    color: colors.black,
  },
  content: {
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
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  authorText: {
    color: colors.blue,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  button: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.blue,
    marginTop: 6,
  },
  commentContainer: {
    marginTop: 12,
    marginHorizontal: 20,
  },
  ratingContainer: {
    marginHorizontal: 20,
  },
});