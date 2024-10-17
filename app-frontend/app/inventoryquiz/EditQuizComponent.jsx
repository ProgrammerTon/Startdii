import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import colors from '../../constants/color';
import PencilIcon from '../../components/PencilIcon';

const EditQuizComponent = ({ quizId }) => {
  const handleEditPress = () => {
    console.log(`Edit Pressed ${quizId}`);
    router.push(`/inventoryquiz/D1_QuizDesEdit?quizId=${quizId}`);
  };

  return (
    <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
      <PencilIcon></PencilIcon>
    </TouchableOpacity>
  );
};

export default EditQuizComponent;

const styles = StyleSheet.create({
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
    marginLeft: 5,
    shadowColor: colors.gray_bgblur,
    shadowOffset: [{ width: 0, height: 0 }],
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
