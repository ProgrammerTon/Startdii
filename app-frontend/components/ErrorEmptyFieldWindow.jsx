import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import colors from '../constants/color';
import fonts from '../constants/font';

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
              <Text style={[fonts.EngSemiBold18, styles.InteractButtonText]}>Error! Please fill all empty fields</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // fullscreenOverlay: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: 'rgba(145, 145, 145, 0.5)', // Semi-transparent background
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(145, 145, 145, 0.5)', 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  InteractButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
  },
  InteractButtonText: {
    color: colors.white,
  },
});

export default ErrorEmptyFieldWindow;