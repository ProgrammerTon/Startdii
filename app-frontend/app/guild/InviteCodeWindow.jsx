import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const InviteCodeWindow = ({ visible, onClose, code }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${code}`);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Invite Code</Text>
          <Text style={styles.codeText}>{code}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },
  codeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
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
  copyButton: {
    flex: 1,
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  copyButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default InviteCodeWindow;
