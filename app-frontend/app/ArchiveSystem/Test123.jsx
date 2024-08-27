import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ArchiveMainPage = () => {
  const [ActiveFilter,setActiveFilter] = useState('Relevance');
  const ToggleFilterChange = (filter) => {
    setActiveFilter(filter); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={ActiveFilter === 'Relevance' ? styles.filterButton : styles.inactiveFilterButton}
          onPress={() => ToggleFilterChange('Relevance')}>
          <Text style={styles.filterText}>Relevance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArchiveMainPage;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#3367d6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  inactiveFilterButton: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14,
  },
});