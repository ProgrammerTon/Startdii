import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const QuizChoice = ({ content, isSelected = false, isCorrect = false, isSolutionType = false, onPress }) => {
  const getChoiceStyle = () => {
    if (isSolutionType) {
      return isCorrect ? styles.correctContainer : (isSelected ? styles.wrongContainer : styles.choiceContainer);
    } else {
      return isSelected ? styles.selectedContainer : styles.choiceContainer;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={isSolutionType}>
      <View style={getChoiceStyle()}>
        <Text style={styles.textStyle}>{content}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#04B36E", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  correctContainer: {
    backgroundColor: "#04B36E", // Green border for correct answers
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#04B36E", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  wrongContainer: {
    backgroundColor: "#F44D19", // Red background for wrong answers
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#04B36E", // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});


export default QuizChoice;
