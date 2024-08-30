import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ChoiceBoxes = ({ count }) => {
  const [activeButtons, setActiveButtons] = useState([0]); 

  const toggleButtonColor = (index) => {
    setActiveButtons((prevActiveButtons) => {
      if (prevActiveButtons.includes(index)) {
        if (prevActiveButtons.length === 1) {
          return prevActiveButtons; 
        }
        return prevActiveButtons.filter((item) => item !== index);
      } else {
        return [...prevActiveButtons, index];
      }
    });
  };

  const renderChoiceBoxes = () => {
    let boxes = [];
    for (let i = 0; i < count; i++) {
      boxes.push(
        <View key={i} style={styles.choiceRow}>
          <TextInput 
            style={styles.choiceBox} 
            placeholder={`Answer ${i + 1}`} 
          />
          <TouchableOpacity
            style={activeButtons.includes(i) ? styles.activeFilterButton : styles.inactiveFilterButton}
            onPress={() => toggleButtonColor(i)}
          >
            <Text style={styles.toggleButtonText}>
              {activeButtons.includes(i)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return boxes;
  };

  return (
    <View style={styles.choiceBoxContainer}>
      {renderChoiceBoxes()}
    </View>
  );
};

export default ChoiceBoxes;

const styles = StyleSheet.create({
  choiceBoxContainer: {
    marginVertical: 10,
    width: '100%',
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  choiceBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  inactiveFilterButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
