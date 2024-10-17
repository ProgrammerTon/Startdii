import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Modal, View } from 'react-native';
import { useRouter, useNavigation } from "expo-router";
import colors from "../../constants/color";
import fonts from "../../constants/font";
const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const AnswerButton = ({ eachQuestionAnswers, userAnswers, quizData }) => {
  //console.log(userAnswers)
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
        style={[styles.answerButton, { backgroundColor: answer === 1 ? colors.green : colors.red }]}
        onPress={() => handlePress(index)}
      >
        <Text style={[fonts.EngMedium14, styles.answerText]}>
          {index + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => openModal()}>
        <Text style={[fonts.EngBold22, styles.buttonText]}>ANSWER</Text>
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
            <Text style={[fonts.EngBold18, styles.modalTitle]}>Answers :</Text>
            <View style={styles.answersContainer}>
              {renderAnswers()}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[fonts.EngMedium16, styles.closeButtonText]}>Close</Text>
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
    backgroundColor: colors.blue,
    paddingVertical: 18,
    paddingHorizontal: width * 0.17, // Responsive width (30% of screen width)
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center", // Center button horizontally
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(145, 145, 145, 0.5)", // semi-transparent background
  },
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 20,
    color: colors.black,
  },
  answersContainer: {
    marginVertical: 5,
    flexDirection: 'row', // Arrange buttons horizontally
    flexWrap: 'wrap', // Wrap buttons if they exceed width
    justifyContent: 'center', // Center items horizontally
  },
  answerButton: {
    flexBasis: '15%', 
    paddingVertical: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    color: colors.white,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  closeButtonText: {
    color: colors.white,
  },
});

export default AnswerButton;
