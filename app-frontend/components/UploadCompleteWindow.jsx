import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

const UploadCompleteWindow = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.InteractButton} onPress={onClose}>
            <Text style={styles.InteractButtonText}>Upload Complete!</Text>
        </Pressable>
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
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  InteractButton: {
    backgroundColor: '#f0f572',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 10,
  },
  InteractButtonText: {
    color: '#000000',
    fontSize: 20,
  },
});

export default UploadCompleteWindow;