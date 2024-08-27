import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity , ScrollView} from 'react-native';
import { Redirect, router } from "expo-router";
import UploadCompleteWindow from '../../components/UploadCompleteWindow';
import ErrorEmptyFieldWindow from '../../components/ErrorEmptyFieldWindow';
import QuestionComponent from './QuestionComponent';

const QuizMakerPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const resetFields = () => {
    setName('');
    setDescription('');
    setTag('');
  };

  const [AddUploadWindowVisible, setAddUploadWindowVisible] = useState(false);
  const [AddErrorEmptyFieldWindow, setAddErrorEmptyFieldWindow] = useState(false);

  const ShowUploadComplete = () => {
    setAddUploadWindowVisible(true);
  };

  const CloseUploadComplete = () => {
    setAddUploadWindowVisible(false);
  };

  const ShowErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(true);
  };

  const CloseErrorEmptyFieldWindow = () => {
    setAddErrorEmptyFieldWindow(false);
  };

  const [questions, setQuestions] = useState([1]);
  const addNewQuestion = () => {
    setQuestions([...questions, questions.length + 1]);
  };

  const Publish = async () => {
    if (
      name === "" ||
      description === "" ||
      tag === "" ||
      content === ""
    ) {
      ShowErrorEmptyFieldWindow();
    } else {
      ShowUploadComplete();
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {questions.map((_, index) => (
          <QuestionComponent key={index} questionNumber={index + 1} />
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addNewQuestion}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton} onPress={Publish}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
        <UploadCompleteWindow visible={AddUploadWindowVisible} onClose={CloseUploadComplete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 5,
  },
  publishButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 20,
  },
  plusText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default QuizMakerPage;
