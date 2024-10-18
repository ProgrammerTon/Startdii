import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const { width, height } = Dimensions.get("window");

const LeaveGuildWindow = ({ visible, onClose, handleLeave }) => {
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
            <Text style={[fonts.EngSemiBold18, styles.codeTextPart1]}>Do you want to </Text>
            <Text style={[fonts.EngSemiBold18, styles.codeTextPart2]}>Leave Guild ?</Text>
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[fonts.EngMedium16, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.leaveButton} onPress={handleLeave}>
              <Text style={[fonts.EngMedium16, styles.leaveButtonText]}>Leave</Text>
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
    backgroundColor: 'rgba(145, 145, 145, 0.5)',
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 10,
  },
  codeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: width * 0.12,
  },
  cancelButton: {
    backgroundColor: colors.gray_button,
    height: 48,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  cancelButtonText: {
    color: colors.black,
    fontSize: 16,
  },
  leaveButton: {
    backgroundColor: colors.red,
    height: 48,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  leaveButtonText: {
    color: colors.white,
  },
  codeTextPart1: {
    color: colors.black,
  },
  codeTextPart2: {
    color: colors.red,
  },
});

export default LeaveGuildWindow;
