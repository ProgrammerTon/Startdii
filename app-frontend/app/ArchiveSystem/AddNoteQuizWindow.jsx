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
            <Text style={styles.InteractButtonText}>N</Text>
          </Pressable>
          <Pressable style={styles.InteractButton} onPress={() => router.push("/ArchiveSystem/D1_AddQuizPage")}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',  
    alignItems: 'flex-end',    
  },
  modalContent: {
    width: '30%',               
    maxWidth: 400,              
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,  
    bottom: 20,                  
    right: -30,          
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

export default AddNoteQuizWindow;