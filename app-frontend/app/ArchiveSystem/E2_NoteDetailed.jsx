import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import TagList from '../../components/TagList';

const SourceDetailPage = () => {
  const { id } = useLocalSearchParams();
  const title = "Title";
  const description = "This is descriptionThis is descriptionThis is descriptionThis is descriptionThis is descriptionThis is description";
  const tags = ["Data", "Bruh"];
  const ownerName = "Best";
  const updated_at = "22/07/24 18:00";
  const score = 4.8;
  const count = 999;
  const comments = [
    { author: 'Juaz Juazzz', date: '22/07/24', content: 'สุดยอดมากครับ' },
    { author: 'Master Student', date: '22/07/24', content: 'ดีเลิศยอดเยี่ยม' },
  ];

  return (
    <ScrollView style={styles.container}>
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

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{score.toFixed(1)}</Text>
        <FontAwesome name="star" size={24} color="#FEDD3A" />
        <Text style={styles.reviewsText}>({count})</Text>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <View key={index} style={styles.commentBox}>
            <Text style={styles.commentAuthor}>{comment.author}</Text>
            <Text style={styles.commentDate}>{comment.date}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
      </View>

      {/* Add Comment */}
      <TextInput
        style={styles.commentInput}
        placeholder="Write a comment..."
        multiline={true}
      />
    </ScrollView>
  );
};

export default SourceDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center',     
    backgroundColor: '#FEDD3A',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'relative', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewsText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  commentsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  commentBox: {
    marginBottom: 15,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  commentContent: {
    fontSize: 14,
    color: 'black',
  },
  commentInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
});
