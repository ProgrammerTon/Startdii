import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CommentBox from '../Quiz_Component/CommentBlock';
import RatingBlock from '../Quiz_Component/Rating';
import SumButton from '../Quiz_Component/SummaryButton';
import CommentBar from '../Quiz_Component/CommentBar';
import RatingBar from '../Quiz_Component/RatingBar';
import { TimeDateBlock, UsernameBlock } from '../Quiz_Component/Time_Username';
import AnswerButton from './AnswersButton';
import ScoreProgress from './ScoreProgressBar';

const { width, height } = Dimensions.get('window');

const QuizSummaryPage = ({ score, userAnswers, quizData, eachQuestionAnswers }) => {

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleSubmitComment = () => {
    if (commentInput.trim() === "") return;

    const newComment = {
      username: "New User", 
      date: new Date().toLocaleDateString(),
      comment: commentInput,
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Finished</Text>
      </View>
      
      <ScrollView style={styles.containerBottom}>
        {/* Score and progress bar container */}
        <View style={styles.scoreProgressContainer}>
          <Text style={styles.scoreText}>{score} / {quizData.length}</Text>
          <ScoreProgress percent={(score / quizData.length) * 100} />
        </View>

        <SumButton/>
        <AnswerButton eachQuestionAnswers={eachQuestionAnswers} userAnswers={userAnswers} quizData={quizData}/>
        <RatingBlock ScoreRating={4.5} numComment={comments.length}/>
        <RatingBar/>

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
    backgroundColor: '#fff',
  },
  containerBottom: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    backgroundColor: "#04B36E",
    padding: height * 0.02,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  scoreProgressContainer: {
    alignItems: 'center', // Center contents horizontally
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center', // Center the text
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 16,
  },
  correctText: {
    fontSize: 16,
    color: 'green',
  },
});
