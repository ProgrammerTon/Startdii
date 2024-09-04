import React , {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import TagList from '../../components/TagList';
import CommentBox from '../Quiz_Component/CommentBlock';
import RatingBlock from '../Quiz_Component/Rating';
import CommentBar from '../Quiz_Component/CommentBar';
import RatingBar from '../Quiz_Component/RatingBar';

const SourceDetailPage = () => {
  const { id } = useLocalSearchParams();
  const title = "Title";
  const description = "This is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is description";
  const tags = ["Data", "Bruh"];
  const ownerName = "Best";
  const updated_at = "22/07/24 18:00";
  const score = 4.8;
  const count = 999;

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* Description and Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{description}</Text>
        <TagList tags={tags} />
        <View style={styles.dateAuthorContainer}>
          <Text style={styles.dateText}>{updated_at}</Text>
          <View style={styles.authorContainer}>
            <Text style={styles.authorText}>By {ownerName}</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="download" size={24} color="#0E68D9" />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="share" size={24} color="#0E68D9" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>

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

export default SourceDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',     
    backgroundColor: '#FEDD3A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative', 
    justifyContent: 'center',  
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  dateAuthorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
  authorContainer: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  authorText: {
    fontSize: 12,
    color: '#0E68D9',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#0E68D9',
    marginTop: 5,
  },
});
