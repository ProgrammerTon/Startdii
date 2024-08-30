import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

const ToggleNoteQuiz = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.InteractButton}>
            <Text style={styles.InteractButtonText}>N</Text>
          </Pressable>
          <Pressable style={styles.InteractButton}>
            <Text style={styles.InteractButtonText}>Q</Text>
          </Pressable>
          <Pressable style={styles.InteractButton} onPress={onClose}>
            <Text style={styles.InteractButtonText}>C</Text>
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
    width: '80%',            
    maxWidth: 400,           
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,             // Optional: adds a shadow for Android
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  InteractButton: {
    backgroundColor: '#fc8601',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  InteractButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default ToggleNoteQuiz;
