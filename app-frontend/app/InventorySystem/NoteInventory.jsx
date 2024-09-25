import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import SourceCard from '../../components/E1_SourceCard';
import { router } from 'expo-router';

const SourceInventory = () => {

  
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push("/J1_NoteInventory")}>
            <SourceCard />
        </TouchableOpacity>
        
    </View>
  );
};

export default SourceInventory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
});