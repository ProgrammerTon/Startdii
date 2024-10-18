import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { deleteQuiz } from '../../services/QuizService';
import { router } from 'expo-router';
import colors from '../../constants/color';
import RecheckBox from '../../components/RecheckBox';

const DeleteQuizComponent = ({ quizId }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    const result = await deleteQuiz(quizId);
    
    if (result) {
      Alert.alert("Success", "Quiz deleted successfully");
      router.back();
    } else {
      Alert.alert("Error", "An error occurred while deleting");
    }
    
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="trash-bin" size={19} color={colors.white} />
      </TouchableOpacity>

      <RecheckBox
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onYesPress={handleDelete}
        title="Are you sure you want to delete this quiz ?"
        yes="Yes, Delete"
        no="Cancel"
      />

      {/* <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to delete this quiz?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Yes, Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default DeleteQuizComponent;

const styles = StyleSheet.create({
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 50,
    marginLeft: 10,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(145, 145, 145, 0.5)', // Dim background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  confirmButton: {
    backgroundColor: colors.red,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: colors.gray_button,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
