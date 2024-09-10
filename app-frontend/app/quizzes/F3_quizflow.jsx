import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import QuizFill from './F3_quizfill';
import QuizChoice from '../../components/QuizChoice';

const QuizFlow = () => {
  // ใช้จำนวน Choice ในการแยกระหว่างคำถามแบบ fill หรือคำถามแบบ Choices โดย 1 = fill และ 2-6 = Choices
  const quizData = [
    {
      questionId: 1,
      question: "Charay Cool of not",
      choicecount: 2,
      choice: ["Not", "Cool"],
      isMultipleAnswer: false,
      answer: [0], // Correct choices based on indexes 0 
    },
    {
      questionId: 2,
      question: "2+2",
      choicecount: 0,
      choice: [], // No choices, since it's a fill-in question
      isMultipleAnswer: false,
      answer: [4], // The correct number answer
    },
    {
      questionId: 3,
      question: "2+5 and 4+5",
      choicecount: 4,
      choice: ["0", "7", "9", "1"],
      isMultipleAnswer: true, // Since there are multiple correct choices
      answer: [1,2], // Correct choices based on indexes 1 and 2
    }
  ];
  
  // Total number of questions
  const quizSummary = {
    totalQuestion: quizData.length,
    questions: quizData,
  };
  
  console.log(quizSummary);
  
  
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default QuizFlow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
});