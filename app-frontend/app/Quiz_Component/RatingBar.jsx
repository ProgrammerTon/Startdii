import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const { width } = Dimensions.get("window"); // Get screen width for responsiveness

const RatingBar = ({ initialRating = 0, onRatingChange }) => {
  const handlePress = (index) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <View style={styles.ratingContainer}>
      <Text style={[fonts.EngMedium16, styles.ratingText]}>Rating</Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => handlePress(star)}>
          <View style={styles.starContainer}>
            <FontAwesome
              name={star <= initialRating ? "star" : "star-o"}
              size={24}
              color={colors.yellow}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  ratingText: {
    color: colors.gray_font,
    marginRight: 10,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});

export default RatingBar;
