import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get("window"); // Get screen width for responsiveness

const RatingBar = ({ initialRating = 0, onRatingChange }) => {
  const handlePress = (index) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>RATING :</Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handlePress(star)}>
          <Text
            style={[
              styles.star,
              { color: star <= initialRating ? "#f5e740" : "gray" },
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginRight: width * 0.02,
  },
  star: {
    fontSize: width * 0.08,
    marginHorizontal: width * 0.01,
  },
});

export default RatingBar;
