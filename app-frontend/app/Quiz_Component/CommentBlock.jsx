import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const CommentBox = ({ username, date, comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    maxWidth: Dimensions.get('window').width - 40, // Keeps it responsive
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    lineHeight: 20,
  },
});
