import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const QuizChoice = ({ content }) => {
  return (
    <TouchableOpacity>
      <View style={styles.choiceContainer}>
        <Text style={styles.textStyle}> {content} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choiceContainer:{
    backgroundColor:"lightblue",
    paddingVertical: 20,
    marginTop:10,
    borderWidth:2,
    borderColor:"black",
    borderStyle:"solid",
    borderRadius:5,
    flexDirection:"row",
    justifyContent:"center",
  },
  textStyle:{
    fontSize: 20,
    //fontWeight: "bold"
  },
});

export default QuizChoice;