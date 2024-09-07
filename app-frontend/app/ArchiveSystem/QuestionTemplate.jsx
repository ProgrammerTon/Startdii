import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import ChoiceBoxes from './ChoiceBoxes';

const QuestionTemplate = () => {
  const [selectedOption, setSelectedOption] = useState('fill');
  const [choices, setChoices] = useState(2);

  const handleChoiceChange = (type) => {
    if (type === 'increase' && choices <= 5) {
      setChoices(choices + 1);
      console.log('Choices:', choices + 1);
    }
    if (type === 'decrease' && choices > 2) {
      setChoices(choices - 1);
      console.log('Choices:', choices - 1);
    }
  };
  
  const [value, setValue] = useState('');

  const handleChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setValue(numericValue);
    console.log('Answer Number Input:', numericValue);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.optionContainer} onPress={() => {
        setSelectedOption('fill')
        console.log('Selected Option:', 'fill');}
        }>
        <View style={[styles.radioButton, selectedOption === 'fill' && styles.selectedRadio]} />
        <Text style={styles.optionText}>Fill the answer</Text>
        {selectedOption === 'fill' && (
          <TextInput style={styles.answerInput} placeholder="Answer" 
          keyboardType="numeric" 
          value={value} 
          onChangeText={handleChange} 
          />
        )}
      </Pressable>

      <Pressable style={styles.optionContainer} onPress={() => {
        setSelectedOption('choice')
        console.log('Selected Option:', 'choice');
        }}>
        <View style={[styles.radioButton, selectedOption === 'choice' && styles.selectedRadio]} />
        <Text style={styles.optionText}>Choice</Text>

        {selectedOption === 'choice' && (
          <View style={styles.choiceContainer}>
            <TouchableOpacity onPress={() => handleChoiceChange('decrease')}>
              <Text style={styles.choiceButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.choiceNumber}>{choices}</Text>
            <TouchableOpacity onPress={() => handleChoiceChange('increase')}>
              <Text style={styles.choiceButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
      {selectedOption === 'choice' && (
        <ChoiceBoxes count={choices} />
      )}
    </View>
  );
};

export default QuestionTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: '#FF4500',
  },
  optionText: {
    fontSize: 16,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    flex: 1,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  choiceButton: {
    fontSize: 20,
    color: '#0066FF',
    paddingHorizontal: 10,
  },
  choiceNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});