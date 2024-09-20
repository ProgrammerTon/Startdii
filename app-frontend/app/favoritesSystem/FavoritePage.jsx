import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SourceCard from "../../components/E1_SourceCard.jsx";
import QuizCard from "../../components/F1_QuizCard.jsx";
const FavoritePage = () => {

  
  return (
    <View style={styles.container}>
      <SourceCard id={"dsdfvgisiowj"} title={"Test1"} author={"Ton"} tags={"Gay"} rating={5}/>
    </View>
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
});