import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const QuizSummaryPage = ({ score, userAnswers, quizData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quiz Summary</Text>
      <Text style={styles.scoreText}>Your Score: {score} / {quizData.length}</Text>
      <ScrollView>
        {quizData.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.answerText}>Your Answer: {userAnswers[index].join(', ')}</Text>
            <Text style={styles.correctText}>
              Correct Answer: {question.answer.join(', ')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuizSummaryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 16,
  },
  correctText: {
    fontSize: 16,
    color: 'green',
  },
});
