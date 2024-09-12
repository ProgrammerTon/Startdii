import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Modal, View } from 'react-native';
import { useRouter, useNavigation } from "expo-router";

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const AnswerButton = ({ eachQuestionAnswers, userAnswers, quizData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Keep track of the selected answer
  const router = useRouter();
  const navigation = useNavigation(); // To use the navigation event listener

  // Extract the inner array
  const answers = (Array.isArray(eachQuestionAnswers) && eachQuestionAnswers[0]) || [];

  useEffect(() => {
    // Listener for navigation focus event
    const unsubscribe = navigation.addListener('focus', () => {
      // When navigating back to this screen, show the modal
      if (selectedAnswer !== null) {
        setModalVisible(true);
      }
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, [navigation, selectedAnswer]);

  const handlePress = (index) => {
    setSelectedAnswer(index);
    console.log('-----------------------');
    console.log("QuestionData:", quizData[index]);
    console.log("Question Type:", quizData[index].qtype);
    console.log("Question Number:", index + 1);
    console.log("Total Questions:", quizData.length);
    console.log("Array of Selected Answer:", userAnswers[index]);

    const path = quizData[index].qtype === "choice"
      ? '/quizzes/F6_quizchoicesolution'
      : '/quizzes/F6_quizfillsolution';

    // Navigate to the new page
    router.push({
      pathname: path,
      params: {
        questionData: JSON.stringify(quizData[index]),
        questionNumber: index + 1,
        totalQuestions: quizData.length,
        questionAnswer: JSON.stringify(userAnswers[index]),
      },
    });

    // Close the modal after a short delay to ensure navigation happens
    setTimeout(() => {
      setModalVisible(false);
    }, 100); // Adjust delay as needed
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const renderAnswers = () => {
    return answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.answerButton, { backgroundColor: answer === 1 ? 'green' : 'red' }]}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.answerText}>
          {index + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => openModal()}>
        <Text style={styles.buttonText}>ANSWER</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
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
