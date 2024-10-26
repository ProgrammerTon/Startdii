import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const GuildJoinWindow = ({
  visible,
  onClose,
  onPress,
  value,
  handleChangeText,
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
          <Text style={[fonts.EngBold22, styles.modalTitle]}>Invite Code </Text>
          <TextInput
            style={styles.inviteContainer}
            value={value}
            onChangeText={handleChangeText}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={[fonts.EngMedium16, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.copyButton} onPress={onPress}>
              <Text style={[fonts.EngMedium16, styles.copyButtonText]}>Join</Text>
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
    backgroundColor: colors.gray_bg,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 20,
    paddingHorizontal: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray_button,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 50,
  },
  cancelButtonText: {
    color: colors.black,
  },
  copyButton: {
    flex: 1,
    backgroundColor: colors.blue,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 50,
  },
  copyButtonText: {
    color: colors.white,
  },
  codeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inviteContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingHorizontal: "50%",
    paddingVertical: "3%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default GuildJoinWindow;
