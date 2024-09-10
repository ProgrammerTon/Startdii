import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import QuizAnswer from './F5_quizanswer';
import CommentBox from '../Quiz_Component/CommentBlock';
import RatingBlock from '../Quiz_Component/Rating';
import SumButton from '../Quiz_Component/SummaryButton';
import CommentBar from '../Quiz_Component/CommentBar';
import RatingBar from '../Quiz_Component/RatingBar';
import { TimeDateBlock, UsernameBlock } from '../Quiz_Component/Time_Username';
import AnswerButton from './AnswersButton';

const QuizSummaryPage = ({ score, userAnswers, quizData,eachQuestionAnswers }) => {

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
      <Text style={styles.headerText}>Quiz Summary</Text>
      <Text style={styles.scoreText}>Your Score: {score} / {quizData.length}</Text>
      <ScrollView>
        {quizData.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.answerText}>Your Answer: {userAnswers[index].join(', ')}</Text>
            <Text style={styles.correctText}>
              Correct Answer: {question.answer.join(', ')}
            </Text>
          </View>
        ))}
        <Text style={styles.answerText}>Your Answer: {eachQuestionAnswers}</Text>
        <Text style={styles.answerText}>Your Answer: {userAnswers}</Text>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
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
