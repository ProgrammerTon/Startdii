import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable,TouchableOpacity } from 'react-native';


const LeaveGuildWindow = ({ visible, onClose}) => {
  const code = 818181
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
        <Text style={styles.codeText}>
          <Text style={styles.codeTextPart1}>Do you want to </Text>
          <Text style={styles.codeTextPart2}>Leave Guild?</Text>
        </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.leaveButton}>
              <Text style={styles.leaveButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  leaveButton: {
    flex: 1,
    backgroundColor: '#e6401f',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  leaveButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  codeTextPart1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', 
  },
  codeTextPart2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e6401f', 
  },
});

export default LeaveGuildWindow;
