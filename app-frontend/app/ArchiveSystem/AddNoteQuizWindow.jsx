import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { Redirect, router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../../constants/color';
import fonts from '../../constants/font';

const { width, height } = Dimensions.get('window');
const AddNoteQuizWindow = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.joinContainer}>
              <Text style={[fonts.EngBold16, styles.text]}>Add Note</Text>
              <TouchableOpacity style={styles.InteractButton} onPress={() => {
                router.push("/ArchiveSystem/C1_AddNotePage")
                onClose();
              }
              }>
                <AntDesign name="addfile" size={23} color={colors.red} />
              </TouchableOpacity>
            </View>
            <View style={styles.joinContainer}>
              <Text style={[fonts.EngBold16, styles.text]}>Add Quiz</Text>
              <TouchableOpacity style={styles.InteractButton} onPress={() => {
                router.push("/ArchiveSystem/D1_AddQuizPage")
                onClose();
              }
              }>
                <MaterialCommunityIcons name="file-question-outline" size={26} color={colors.red} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <FontAwesome name="close" size={24} color={colors.white} />
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
    backgroundColor: 'rgba(145, 145, 145, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    bottom: height * 0.17,
    right: width * -0.615,
  },
  modalContent: {
    width: "30%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    bottom: 10,
    right: -35,
  },
  InteractButton: {
    borderRadius: 30,
    width: 55,
    height: 55,
    backgroundColor: colors.white,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: colors.red,
    borderRadius: 30,
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.red,
    position: "absolute",
    zIndex: 1,
    right: 70,
  },
  joinContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNoteQuizWindow;
