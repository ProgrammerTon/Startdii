import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DeleteNoteComponent = ({sourceId}) => {

  return (
    <>
      <TouchableOpacity style={styles.reportButton} >
        <Ionicons name="trash-bin" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default DeleteNoteComponent;

const styles = StyleSheet.create({
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
  },
});
