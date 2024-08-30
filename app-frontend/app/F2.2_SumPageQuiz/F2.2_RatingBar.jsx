import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsiveness

const RatingBar = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handlePress = (index) => {
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>RATING :</Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handlePress(star)}
        >
          <Text style={[styles.star, { color: star <= rating ? '#f5e740' : 'gray' }]}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: width * 0.05, // Responsive padding
  },
  ratingText: {
    fontSize: width * 0.04, // Responsive font size
    fontWeight : "bold" ,
    marginRight: width * 0.02, // Responsive margin
  },
  star: {
    fontSize: width * 0.08, // Responsive font size for stars
    marginHorizontal: width * 0.01, // Responsive spacing between stars
  },
});

export default RatingBar;
