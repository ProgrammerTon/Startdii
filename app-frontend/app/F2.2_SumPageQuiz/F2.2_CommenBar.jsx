import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const CommentBar = ({ value = '', handleChangeText, onSubmit }) => {
  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        placeholderTextColor="#c4c4c4"
        value={value}
        onSubmitEditing={onSubmit}
        onChangeText={handleChangeText}
        multiline // Allows for multiple lines of input
      />
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
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center", // Align items vertically
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100, // Limits the height of the input
  },
  clearButton: {
    fontSize: 16,
    color: "#c4c4c4",
    marginLeft: 10,
  },
});

export default CommentBar;
