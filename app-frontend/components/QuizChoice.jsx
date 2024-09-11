import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const QuizChoice = ({ content, isSelected = false, onPress, isMultipleAnswer = false }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.choiceContainer, isSelected && styles.selectedContainer]}>
        {isMultipleAnswer && (
          <MaterialCommunityIcons
            name={isSelected ? "checkbox-marked" : "checkbox-blank-outline"}
            size={24}
            color={isSelected ? "#29DE91" : "#bbb"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
        )}
        <Text style={styles.textStyle}> {content} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#04B36E", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedContainer: {
    backgroundColor: "#04B36E", // Green background when selected
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default QuizChoice;
