import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity,Dimensions } from 'react-native';
import { Redirect, router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');
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
          <TouchableOpacity style={styles.InteractButton} onPress={() => {
            router.push("/ArchiveSystem/C1_AddNotePage")
            onClose();}
            }>
            <AntDesign name="addfile" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.InteractButton} onPress={() => {
            router.push("/ArchiveSystem/D1_AddQuizPage")
            onClose();}
            }>
          <MaterialCommunityIcons name="file-question-outline" size={20} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.InteractButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: height * 0.15, 
    right: width * -0.615, 
  },
  modalContent: {
    width: '30%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    bottom: 20,
    right: -30,
  },
  InteractButton: {
    backgroundColor: '#fc8601',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddNoteQuizWindow;
