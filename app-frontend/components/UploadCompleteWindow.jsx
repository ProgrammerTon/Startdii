import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import colors from '../constants/color';

const UploadCompleteWindow = ({ visible, onClose }) => {
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
              <Text style={styles.InteractButtonText}>Upload Complete!</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(145, 145, 145, 0.5)", 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  InteractButton: {
    backgroundColor: colors.yellow,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
  },
  InteractButtonText: {
    color: colors.black,
    fontSize: 20,
  },
});

export default UploadCompleteWindow;