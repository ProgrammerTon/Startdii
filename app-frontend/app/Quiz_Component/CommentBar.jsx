import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";

const CommentBar = ({ value, handleChangeText, onSubmit }) => {
  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        placeholderTextColor="#c4c4c4"
        value={value}
        onChangeText={handleChangeText}
        multiline
        scrollEnabled
      />
      
      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
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
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 150,
    minHeight: 40,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    fontSize: 16,
    color: "#c4c4c4",
    marginLeft: 10,
  },
});

export default CommentBar;
