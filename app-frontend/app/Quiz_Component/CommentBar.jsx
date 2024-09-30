import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const CommentBar = ({ value, handleChangeText, onSubmit }) => {
  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        placeholderTextColor={colors.gray_button}
        value={value}
        onChangeText={handleChangeText}
        multiline
        scrollEnabled
      />
      
      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={[fonts.EngMedium12, styles.submitText]}>Submit</Text>
      </TouchableOpacity>
      
      {value.length > 0 && (
        <TouchableOpacity onPress={() => handleChangeText('')}>
          <Text style={styles.clearButton}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 150,
    minHeight: 40,
  },
  submitButton: {
    backgroundColor: colors.blue,
    padding: 9,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginLeft: 10,
  },
  submitText: {
    color: colors.white,
  },
  clearButton: {
    fontSize: 16,
    color: colors.red,
    marginLeft: 10,
  },
});

export default CommentBar;
