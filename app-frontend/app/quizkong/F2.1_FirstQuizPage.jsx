import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar';
const FirstQuizPage = () => {

  
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
};

export default FirstQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#000000',
    padding: 20,
  },
});