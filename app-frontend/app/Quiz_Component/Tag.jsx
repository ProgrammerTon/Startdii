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
    borderRadius: 20, 
    paddingVertical: 5, 
    paddingHorizontal: 15, 
    marginRight: 10, 
    marginVertical: 5, 
  },
  tagText: {
    color: '#000000', 
    fontSize: 13, 
  },
});
