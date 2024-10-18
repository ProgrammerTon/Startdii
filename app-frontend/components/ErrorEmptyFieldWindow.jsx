import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';

const ErrorEmptyFieldWindow = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <Pressable style={styles.InteractButton} onPress={onClose}>
              <Text style={styles.InteractButtonText}>Error! Please fill all empty fields</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(145, 145, 145, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  InteractButton: {
    backgroundColor: '#eb2d2d',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
  },
  InteractButtonText: {
    color: '#000000',
    fontSize: 20,
  },
});

export default ErrorEmptyFieldWindow;