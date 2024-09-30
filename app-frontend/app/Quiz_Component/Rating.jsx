import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StarRating from './Star';
import colors from '../../constants/color';
import fonts from '../../constants/font';
import { FontAwesome } from "@expo/vector-icons";

const RatingBlock = ({ ScoreRating, numComment }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={[fonts.EngBold22, styles.ScoreRating]}>{ScoreRating}</Text>
        {/* <StarRating /> */}
        <View style={styles.starContainer}>
          <FontAwesome
            name={"star"}
            size={24}
            color={colors.yellow}
          />
        </View>
        <Text style={[fonts.EngMedium14, styles.numComment]}>({numComment})</Text>
      </View>
    </View>
  );
};

export default RatingBlock;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    flexDirection: 'row',
    // justifyContent: "space-between",
    marginBottom: 5,
  },
  starContainer: {
    top: 3,
    marginRight: 10,
  },
  ScoreRating: {
    marginRight: 8,
    color: colors.black,
  },
  numComment: {
    top: 3,
    marginTop: 5,
    color: colors.gray_font,
  },
});
