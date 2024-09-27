import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StarRating from './Star';

const RatingBlock = ({ ScoreRating, numComment}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.ScoreRating}>{ScoreRating}</Text>
        <StarRating />
        <Text style={styles.numComment}>({numComment})</Text>
      </View>
    </View>
  );
};

export default RatingBlock;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop : 15,
    flexDirection: 'row',
    // justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  ScoreRating: {
    fontWeight: 'bold',
    marginRight : 10 ,
    fontSize: 22,
    color: '#333',
  },
  numComment: {
    marginTop : 5,
    fontSize: 15,
    color: '#999',
  },
});
