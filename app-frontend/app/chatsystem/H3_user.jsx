import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
const ChatSearch = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="green" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in conversation"
        />
      </View>

      {/* Note Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/chatsystem/H4_NoteUser")}>
        <Text style={styles.buttonText}>Note</Text>
      </TouchableOpacity>

      {/* Quiz Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/chatsystem/H5_QuizUser")}>
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginVertical: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
