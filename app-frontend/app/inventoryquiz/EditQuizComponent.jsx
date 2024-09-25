import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

const EditQuizComponent = ({ quizId }) => {
  const handleEditPress = () => {
    console.log(`Edit Pressed ${quizId}`);
    router.push(`/inventoryquiz/D1_QuizDesEdit?quizId=${quizId}`);
  };

  return (
    <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
      <AntDesign name="edit" size={24} color="black" />
      <Text style={styles.editText}>Edit</Text>
    </TouchableOpacity>
  );
};

export default EditQuizComponent;

const styles = StyleSheet.create({
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editText: {
    color: "#000",
    fontSize: 14,
    marginLeft: 5,
  },
});
