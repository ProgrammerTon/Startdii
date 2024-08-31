import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const QuizChoice = ({ content, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.choiceContainer, isSelected && styles.selectedContainer]}>
        <Text style={styles.textStyle}> {content} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceContainer:{
    backgroundColor:"#fff",
    paddingVertical: 20,
    marginTop:10,
    borderWidth:3,
    borderColor:"#04B36E",
    borderStyle:"solid",
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"center",
  },
  selectedContainer: {
    backgroundColor: "#04B36E", // Change to desired color for selected state
  },
  textStyle:{
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default QuizChoice;