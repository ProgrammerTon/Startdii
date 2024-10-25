import React from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import colors from "../../constants/color";

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
    backgroundColor: "rgba(145, 145, 145, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.white,
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
    backgroundColor: colors.gray_button,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  cancelButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  promoteButton: {
    flex: 1,
    backgroundColor: colors.green,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  promoteButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  kickButton: {
    flex: 1,
    backgroundColor: colors.red,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  kickButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default PromoteOrKickWindow;
