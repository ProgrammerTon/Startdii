import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

const PromoteOrKickWindow = ({
  visible,
  onClose,
  handlePromote,
  handleKick,
  userId,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.promoteButton}
              onPress={() => {
                handlePromote(userId);
              }}
            >
              <Text style={styles.promoteButtonText}>Promote</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.kickButton}
              onPress={() => {
                handleKick(userId);
              }}
            >
              <Text style={styles.kickButtonText}>Kick</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  promoteButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  promoteButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  kickButton: {
    flex: 1,
    backgroundColor: "#e6401f",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  kickButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default PromoteOrKickWindow;
