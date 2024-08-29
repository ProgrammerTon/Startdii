import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";

const Button = ({ onPress, title, style, textStyle, color, textcolor }) => {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef(null);
  const handleTextLayout = (event) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        { backgroundColor: color, width: textWidth + 60 }
      ]}
      onPress={onPress}
    >
      <View onLayout={handleTextLayout}>
        <Text ref={textRef} style={[fonts.EngMedium18, textStyle, { color: textcolor }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Button;

