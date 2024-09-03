import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";

const CommentBar = ({ value = '', handleChangeText, onSubmit }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#c4c4c4"
          value={value}
          onSubmitEditing={onSubmit}
          onChangeText={handleChangeText}
          multiline // Allows for multiple lines of input
          scrollEnabled={true} // Enables scrolling for long text
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => handleChangeText('')}>
            <Text style={styles.clearButton}>X</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    maxHeight: 150, // Increase the max height for more text
    minHeight: 40, // Minimum height to start with
  },
  clearButton: {
    fontSize: 16,
    color: "#c4c4c4",
    marginLeft: 10,
  },
});

export default CommentBar;
