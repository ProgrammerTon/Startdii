import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/color';
import Svg, { Path } from 'react-native-svg';
import { router,useRouter } from 'expo-router';
const BackButton = () => {

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.back()} >
      <Svg
        style={styles.iconContainer}
        viewBox="0 0 22 19"
        fill={colors.blue}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd" />
      </Svg>
    </TouchableOpacity>
  );
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 19,
    bottom: 23,
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 42,
    width: 42,
    zIndex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center', // Center the SVG vertically
    alignItems: 'center', // Center the SVG horizontally
    height: '100%', // Ensure container fills the button
    width: '100%',  // Ensure container fills the button
  },
});
