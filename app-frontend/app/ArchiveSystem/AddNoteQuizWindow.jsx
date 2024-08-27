import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { Redirect, router } from "expo-router";

const AddNoteQuizWindow = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.InteractButton} onPress={() => router.push("/ArchiveSystem/C1_AddNotePage")}>
            <Text style={styles.InteractButtonText}>Notes</Text>
          </Pressable>
          <Pressable style={styles.InteractButton} onPress={() => router.push("/ArchiveSystem/D1_AddQuizPage")}>
            <Text style={styles.InteractButtonText}>Quiz</Text>
          </Pressable>
          <Pressable style={styles.InteractButton} onPress={onClose}>
            <Text style={styles.InteractButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  InteractButton: {
    backgroundColor: '#3367d6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  InteractButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default AddNoteQuizWindow;