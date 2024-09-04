import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const SumButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => alert('woof woof')}>
      <Text style={styles.buttonText}> SUMMARY</Text>
    </TouchableOpacity>
  );
};

export default SumButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2c35ac',
    paddingVertical: 15,
    paddingHorizontal: width * 0.3, // Responsive width (30% of screen width)
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center', // Center button horizontally
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});