import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Modal, View } from 'react-native';
import QuizChoiceSolution from './F6_quizchoicesolution';
import QuizFillSolution from './F6_quizfillsolution';

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const AnswerButton = ({ eachQuestionAnswers, userAnswers, quizData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Keep track of the selected answer

  // Extract the inner array
  const answers = (Array.isArray(eachQuestionAnswers) && eachQuestionAnswers[0]) || [];

  const handlePress = (index) => {
    setSelectedAnswer(index);
    console.log("Selected Answer Index:", index);
    console.log("Selected Answer Value:", eachQuestionAnswers[0][index]);
    console.log("Quiz Data for Selected Answer:", quizData[index]);
    console.log("Answer Index (1-based):", index + 1);
    console.log("Total Number of Questions:", quizData.length);
    setModalVisible(true);
  };

  const renderAnswers = () => {
    return answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.answerButton,
          { backgroundColor: answer === 1 ? 'green' : 'red' }
        ]}
        onPress={() => handlePress(index)} // Pass index to handlePress
      >
        <Text style={styles.answerText}>
          {index + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handlePress(selectedAnswer)}>
        <Text style={styles.buttonText}>ANSWER</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Answers:</Text>
            <View style={styles.answersContainer}>
              {renderAnswers()}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render the solution component */}
          {selectedAnswer !== null && (
            quizData[selectedAnswer].qtype === "choice" ? (
              <QuizChoiceSolution
                questionData={quizData[selectedAnswer]}
                questionNumber={selectedAnswer + 1}
                totalQuestions={quizData.length}
                questionAnswer={userAnswers[selectedAnswer]}
              />
            ) : (
              <QuizFillSolution
                questionData={quizData[selectedAnswer]}
                questionNumber={selectedAnswer + 1}
                totalQuestions={quizData.length}
                equestionAnswer={userAnswers[selectedAnswer]}
              />
            )
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fdf322',
    paddingVertical: 15,
    paddingHorizontal: width * 0.3, // Responsive width (30% of screen width)
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center', // Center button horizontally
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answersContainer: {
    marginVertical: 10,
    flexDirection: 'row', // Arrange buttons horizontally
    flexWrap: 'wrap', // Wrap buttons if they exceed width
    justifyContent: 'center', // Center items horizontally
  },
  answerButton: {
    flex: 1, // Ensure buttons take up equal space
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40, // Set a minimum width for buttons
  },
  answerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnswerButton;
