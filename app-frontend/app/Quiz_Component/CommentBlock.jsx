import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/color';
import fonts from '../../constants/font';

const CommentBox = ({ username, date, comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.headerContainer}>
        <Text style={[fonts.EngSemiBold14, styles.username]}>{username}</Text>
        <Text style={[fonts.EngRegular12, styles.date]}>{date}</Text>
      </View>
      <Text style={[fonts.EngRegular14, styles.comment]}>{comment}</Text>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: '100%',
    maxWidth: Dimensions.get('window').width - 40, // Keeps it responsive
    alignSelf: 'center',
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    color: colors.black,
  },
  date: {
    color: colors.gray_font,
  },
  comment: {
    color: colors.black,
    lineHeight: 20,
  },
});
