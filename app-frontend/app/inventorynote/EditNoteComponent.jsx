import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
const EditNoteComponent = ({sourceId}) => {

  return (
    <>
      <TouchableOpacity style={styles.reportButton} 
        onPress={() => { 
          console.log(`Edit Pressed ${sourceId}`); 
          router.push(`/inventorynote/C1_EditNotePage?sourceId=${sourceId}`); 
        }}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

export default EditNoteComponent;

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
