import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window"); // Get screen width for responsive sizing

const SumButton = ({ handleOnPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={styles.buttonText}> STATISTICS </Text>
    </TouchableOpacity>
  );
};

export default SumButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2c35ac",
    paddingVertical: 15,
    paddingHorizontal: width * 0.3, // Responsive width (30% of screen width)
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center", // Center button horizontally
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
