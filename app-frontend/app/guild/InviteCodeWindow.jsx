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
import * as Clipboard from "expo-clipboard";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const { width, height } = Dimensions.get("window");

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
          <Text style={[fonts.EngMedium16, styles.modalTitle]}>Invite Code</Text>
          <Text style={styles.codeText}>{code}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[fonts.EngMedium16, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Text style={[fonts.EngMedium16, styles.copyButtonText]}>Copy</Text>
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
    color: colors.gray_font,
  },
  codeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.black,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: width * 0.05,
    gap: width * 0.05,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray_button,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
    marginRight: 10,
  },
  cancelButtonText: {
    color: colors.black,
  },
  copyButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 50,
  },
  copyButtonText: {
    color: colors.white,
  },
});

export default InviteCodeWindow;
