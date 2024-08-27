import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

// Get screen width for responsive design
const { width } = Dimensions.get('window');

const Componentchatuser = ({ username = 'Mr.BOB', message = 'Sample message', time = '12:51' }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chatItem}>
        <View style={styles.textContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40, // Responsive width with padding
    alignSelf: 'center',
    marginVertical: 5, // Space between components
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1, // Takes up available space
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default Componentchatuser;
