import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import DescriptionBox from './F2.1_descriptionBox';
import Tag from './F2.1_Tag';
import StartButton from './F2.1_StartButton';

const FirstQuizPage = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerStyle}>Data Mining</Text>
        <DescriptionBox />
        <View style={styles.tagsContainer}>
          <Tag label="#datasci" />
          <Tag label="#datamining" />
        </View>
          <StartButton/>
      </ScrollView>
    </View>
  );
};

export default FirstQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Change flex value to 1 for proper layout
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#38b560',
    padding: 20,
    borderRadius: 5,
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
});
