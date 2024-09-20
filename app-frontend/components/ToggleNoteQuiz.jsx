import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import the icon library

const ToggleNoteQuiz = ({ setValue, visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.InteractButton}
            onPress={() => setValue(true)}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color="#4285F4"
            />
            <Text style={styles.InteractButtonText}>Note</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.InteractButton}
            onPress={() => setValue(false)}
          >
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={24}
              color="#4285F4"
            />
            <Text style={styles.InteractButtonText}>Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.InteractButton} onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#4285F4" />
            <Text style={styles.InteractButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  InteractButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4285F4",
  },
  InteractButtonText: {
    color: "#4285F4",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default ToggleNoteQuiz;
