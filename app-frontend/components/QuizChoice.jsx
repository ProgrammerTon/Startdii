import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const QuizChoice = ({ content, isSelected = false, onPress, isCorrect = false, isMultipleAnswer = false, isSolutionType = false, isFillType=false}) => {
  const correctandnotselected = isCorrect && !isSelected && isSolutionType
  const incorrectedandselected = !isCorrect && isSelected && isSolutionType
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.choiceContainer, (isSelected)? (incorrectedandselected)? styles.incorrect : styles.selectedContainer : (correctandnotselected)? styles.correctandnotselected : null, isMultipleAnswer && styles.multipleAnswer, isFillType && styles.fillType]}>
        {(isMultipleAnswer)? (incorrectedandselected)? <MaterialCommunityIcons name="close-box" size={24} color={"#F44D19"} style={{alignSelf:"center", marginRight: 5}}/>
         : <MaterialCommunityIcons name="checkbox-marked" size={24} color={(correctandnotselected)? "#F44D19" : (isSelected)? "#29DE91":"#bbb"} style={{alignSelf:"center", marginRight: 5}}/> : null}
        <Text style={styles.textStyle}> {content} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceContainer:{
    backgroundColor:"#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop:10,
    borderWidth:3,
    borderColor:"#04B36E", // Green
    borderStyle:"solid",
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"center",
  },
  selectedContainer: {
    backgroundColor: "#04B36E", // Green
  },
  multipleAnswer:{
    justifyContent:"space between",
  },
  incorrect:{
    borderColor:"#F44D19",
    backgroundColor:"#04B36E",
  },
  correctandnotselected:{
    borderColor:"#F44D19",
    backgroundColor:"#fff",
  },
  fillType:{
    backgroundColor:"#fff",
  },
  textStyle:{
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default QuizChoice;