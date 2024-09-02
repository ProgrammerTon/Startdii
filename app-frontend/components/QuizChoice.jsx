import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const QuizChoice = ({ content, isSelected, onPress, makeColumn, isMultipleAnswer}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.choiceContainer, isSelected && styles.selectedContainer, makeColumn && styles.makeColumn, isMultipleAnswer && styles.multipleAnswer]}>
        {(isMultipleAnswer)? <MaterialCommunityIcons name="checkbox-marked" size={24} color="#bbb" style={{alignSelf:"center", marginRight: 5}}/> : null}
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
  makeColumn: {
    width: width * 0.4,
  },
  multipleAnswer:{
    justifyContent:"space between",
  },
  textStyle:{
    fontSize: 20,
    fontWeight: "bold"
  },
});

export default QuizChoice;