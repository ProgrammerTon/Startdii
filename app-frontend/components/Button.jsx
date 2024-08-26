import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const Button = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[fonts.EngMedium18, styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    height: '100%',
    width: '195%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
  },
});

export default Button;
