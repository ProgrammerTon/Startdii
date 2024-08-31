import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { Redirect, router } from "expo-router";
import ErrorEmptyFieldWindow from '../../components/ErrorEmptyFieldWindow';

const AddQuizPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const resetFields = () => {
    setName('');
    setDescription('');
    setTag('');
  };

  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] = useState(false);

  const ShowErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true);
  };

  const CloseErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false);
  };

  const Next = async () => {
    if (
      name === "" ||
      description === "" ||
      tag === ""
    ) {
      ShowErrorEmptyFieldWindow();
    } else {
      router.push("/ArchiveSystem/D2_QuizMaker");
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Quiz</Text>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      
      <Text style={styles.label}>Tag</Text>
      <TextInput
        style={styles.input}
        value={tag}
        onChangeText={setTag}
        placeholder="Tag"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.publishButton} onPress={Next}>
          <Text style={styles.publishButtonText}>Next</Text>
        </TouchableOpacity>
        <ErrorEmptyFieldWindow visible={AddErrorEmptyFieldWindow} onClose={CloseErrorEmptyFieldWindow}/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  uploadButton: {
    width: 100,
    height: 40,
    backgroundColor: '#4d90fe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    width: 100,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000',
    fontSize: 16,
  },
  publishButton: {
    width: 100,
    height: 40,
    backgroundColor: '#3367d6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddQuizPage;
