import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DescriptionBlock from '../Quiz_Component/descriptionBlock';
import Tag from '../Quiz_Component/Tag';
import StartButton from '../Quiz_Component/StartButton';
import { TimeDateBlock, UsernameBlock } from '../Quiz_Component/Time_Username';
import CommentBox from '../Quiz_Component/CommentBlock';
import RatingBlock from '../Quiz_Component/Rating';
import SumButton from '../Quiz_Component/SummaryButton';
import CommentBar from '../Quiz_Component/CommentBar';
import RatingBar from '../Quiz_Component/RatingBar';

const SumQuizPage = () => {
  const TotalQuestion = 11;

  // State to hold the list of comments
  const [comments, setComments] = useState([]);
  // State for the input value in the CommentBar
  const [commentInput, setCommentInput] = useState('');

  // Function to handle submitting a new comment
  const handleSubmitComment = () => {
    if (commentInput.trim() === '') return; // Prevent empty comments

    // Create a new comment object
    const newComment = {
      username: "New User", // Replace with dynamic username if available
      date: new Date().toLocaleDateString(),
      comment: commentInput,
    };

    // Add the new comment to the top of the comments list
    setComments([newComment, ...comments]);

    // Clear the comment input
    setCommentInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerStyle}>Data Mining</Text>
        <DescriptionBlock/>
        <View style={styles.tagsContainer}>
          <Tag label="#datasci" />
          <Tag label="#datamining" />
        </View>
        <View style={styles.headerContainer}>
          <TimeDateBlock timeDate="22/07/24 18:00" />
          <UsernameBlock />
        </View>
        <Text style={styles.headerQs}>{TotalQuestion} Questions</Text>
        <StartButton/>
        <SumButton/>
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

export default SumQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerQs: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
