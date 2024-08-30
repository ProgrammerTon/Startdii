import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DescriptionBlock = () => {
  return (
    <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
                        BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL BESTBELL 

        </Text>
    </View>
  );
};

export default DescriptionBlock;

const styles = StyleSheet.create({
  descriptionBox: {
    marginTop: 5, // Space between header and description
    padding: 15,
    backgroundColor: '#F0F0F0', // Light gray background for description
    borderRadius: 5, // Rounded corners
  },
  descriptionText: {
    fontSize: 16, // Font size for the description text
    color: '#000000', // Black text color
    textAlign: 'justify', // Center text horizontally
    // or you can use textAlign: 'left' if you want left-aligned text
  },
});
