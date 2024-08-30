import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DescriptionBox from './F2.1_descriptionBox';
import Tag from './F2.1_Tag';

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
      </ScrollView>
    </View>
  );
};

export default FirstQuizPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
  tagsContainer: {
    flexDirection: 'row', // Arrange tags in a row
    flexWrap: 'wrap', // Allow tags to wrap to the next line
    marginTop: 10, // Add some margin at the top
  },
});
