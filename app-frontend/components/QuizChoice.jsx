import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../constants/color';
import fonts from '../constants/font';

const { width, height } = Dimensions.get('window');

const QuizChoice = ({ content, isSelected = false, isCorrect = false, isSolutionType = false, onPress , isMultipleAnswer = false}) => {
  const getChoiceStyle = () => {
    if (isSolutionType) {
      if (isMultipleAnswer) {
        return isCorrect ? (isSelected ? styles.correctContainer : styles.correctnotSelectedContainer) : (isSelected ? styles.wrongSelectedContainer : styles.choiceContainer);
      }
      else{
        return isCorrect ? styles.correctContainer : (isSelected ? styles.wrongContainer : styles.choiceContainer);
      }
    } else {
      return isSelected ? styles.selectedContainer : styles.choiceContainer;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={isSolutionType}>
      <View style={getChoiceStyle()}>
        {(isMultipleAnswer)? (!isCorrect && isSelected && isSolutionType)? <MaterialCommunityIcons name="close-box" size={24} color={colors.red} style={styles.iconStyle}/>
         : <MaterialCommunityIcons name="checkbox-marked" size={24} color={(isCorrect && !isSelected && isSolutionType)? colors.red : (isSelected)? colors.green:colors.gray_button} style={styles.iconStyle}/> : null}
        <View style={styles.textWrapper}>
          <Text style={styles.textStyle}>{content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  choiceContainer: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.green, // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectedContainer: {
    backgroundColor: colors.green, // Green background when selected
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.green, // Green border for default
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  correctContainer: {
    backgroundColor: colors.green, // Green background when selected
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.green, // Green border for correct answers
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  correctnotSelectedContainer: {
    backgroundColor: colors.white, // White background when not selected
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.red, // Red border for correct and not selected answers
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  wrongSelectedContainer: {
    backgroundColor: colors.green, // Green background for correct answers
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.red, // Red border for wrong answers
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  wrongContainer: {
    backgroundColor: colors.red, // Red background for wrong answers
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.red, // Red border for wrong answers
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconStyle:{
    alignSelf: "center",
    marginLeft: 8,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -8,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf:"center",
  },
});

export default QuizChoice;
