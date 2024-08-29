import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const Button = ({ content }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={[fonts.EngMedium18, styles.buttonText]}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "solid",
    borderColor:"black",
    flexDirection:"row",
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
  },
});

export default Button;