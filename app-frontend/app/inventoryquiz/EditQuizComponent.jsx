import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const EditQuizComponent = ({quizId}) => {

  return (
    <>
      <TouchableOpacity style={styles.reportButton} 
        onPress={() => console.log(`Edit Pressed ${quizId}`)}
        
        >
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default EditQuizComponent;

const styles = StyleSheet.create({
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
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
