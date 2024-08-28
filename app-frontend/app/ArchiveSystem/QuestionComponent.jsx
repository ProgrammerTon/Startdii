import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import QuestionTemplate from './QuestionTemplate';

const { width } = Dimensions.get('window');

const QuestionComponent = ({ questionNumber }) => {
  const [question, setQuestion] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
        placeholder="Question"
      />
      <QuestionTemplate />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 120,
    width: '100%', 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#fff',
  },
});

export default QuestionComponent;
