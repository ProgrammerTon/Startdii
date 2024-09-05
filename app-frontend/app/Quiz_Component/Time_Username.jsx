import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimeDateBlock = ({ timeDate }) => {
  return (
    <Text style={styles.timeDate}>
      {timeDate ? timeDate : "0/0/00 00.00"}
    </Text>
  );
};

const UsernameBlock = ({ username }) => {
  return (
    <View style={styles.usernameContainer}>
      <Text style={styles.username}>
        {username ? username : "noname"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeDate: {
    fontSize: 14,
    color: '#999',
  },
  usernameContainer: {
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  username: {
    color: '#1E90FF',
    fontSize: 14,
  },
});

export { TimeDateBlock, UsernameBlock };
