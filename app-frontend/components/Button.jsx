import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const Button = ({ onPress, title, style, textStyle, color, textcolor }) => {
  return (
    <TouchableOpacity style={[styles.button, style, { backgroundColor: color }]} onPress={onPress}>
      <Text style={[fonts.EngMedium18, textStyle, { color: textcolor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '195%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default Button;
