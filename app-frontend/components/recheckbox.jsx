import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../constants/color";
import fonts from "../constants/font";

const RecheckBox = ({
  visible,
  onClose,
  onYesPress,
  title,
  yes,
  no,
  otherStyles,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <View style={styles.textcontainer}>
            <Text style={[fonts.EngSemiBold18, styles.titleText]}>{title}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.nobox} onPress={onClose}>
              <Text style={[fonts.EngMedium16, styles.noText]}>{no}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yesbox} onPress={onYesPress}>
              <Text style={[fonts.EngMedium16, styles.yesText]}>{yes}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RecheckBox;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(145, 145, 145, 0.7)",
  },
  box: {
    backgroundColor: colors.white,
    height: 140,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textcontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 22,
  },
  yesbox: {
    backgroundColor: colors.red,
    height: 48,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nobox: {
    backgroundColor: colors.gray_button,
    height: 48,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    color: colors.black,
  },
  yesText: {
    color: colors.white,
  },
  noText: {
    color: colors.black,
  },
});
