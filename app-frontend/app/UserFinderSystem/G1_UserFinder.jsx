import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SearchBar from '../../components/SearchBar';
import UserNameComponent from './UserNameComponent';

const UserFinderPage = () => {

  return (
    <View style={styles.container}>
      <SearchBar />
      <UserNameComponent />
    </View>
  );
};

export default UserFinderPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
});