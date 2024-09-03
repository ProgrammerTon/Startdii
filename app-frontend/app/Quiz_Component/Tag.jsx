import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Tag = ({ label }) => {
  return (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#E0E0E0', // Light grey background
    borderRadius: 20, // Rounded corners
    paddingVertical: 5, // Vertical padding
    paddingHorizontal: 15, // Horizontal padding
    marginRight: 10, // Space between tags
    marginVertical: 5, // Space between rows of tags
  },
  tagText: {
    color: '#000000', // Black text color
    fontSize: 13, // Font size for the tag
  },
});
