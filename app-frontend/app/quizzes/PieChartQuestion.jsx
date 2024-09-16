import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { BarChart, Grid , PieChart} from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { router } from "expo-router";

const PieChartQuestion = () => {
  const questionData = {
    question: "2+5 and 3+2 and 1+8" ,
    qtype: "choice",
    choice: ["0", "7", "9", "1", "5"],
    answer: [1, 2, 4], // Correct answers are '7' and '9' and '5'
  }
  const allUsersAnswers = [[1,2,4],[1,2],[1,2,4]];
  const allUsersScore = [0,1,0];
  
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default PieChartQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
});