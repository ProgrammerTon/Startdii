import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import colors from "../../constants/color";
import fonts from "../../constants/font";

const { width } = Dimensions.get("window"); // Get screen width for responsive sizing

const StartButton = ({ handleOnPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={[fonts.EngBold22, styles.buttonText]}>START</Text>
    </TouchableOpacity>
  );
};

export default StartButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 18,
    paddingHorizontal: width * 0.17, // Responsive width (30% of screen width)
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center", // Center button horizontally
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
});
